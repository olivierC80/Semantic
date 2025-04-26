# (dans generate_html.py)
import json
import html
import sys
import os

# --- Constantes ---
NUM_COLUMNS = 3
INITIAL_MAX_LINES = 50
MAX_LINES_OPTIONS = [50, 54, 58, 62]

# --- Fonctions ---
def load_code_cells(json_filepath):
    # ... (inchangé) ...
    if not os.path.exists(json_filepath): print(f"Erreur: Fichier '{json_filepath}' non trouvé.", file=sys.stderr); sys.exit(1)
    try:
        with open(json_filepath, "r", encoding="utf-8") as f: data = json.load(f)
    except Exception as e: print(f"Erreur lecture/JSON '{json_filepath}': {e}", file=sys.stderr); sys.exit(1)
    if "code_cells" not in data or not isinstance(data["code_cells"], list): print(f"Erreur: 'code_cells' invalide dans '{json_filepath}'.", file=sys.stderr); sys.exit(1)
    return data['code_cells']


def prepare_cells(code_cells_raw):
    # ... (inchangé) ...
    cells = []
    print("Préparation des cellules...")
    for i, cell_lines in enumerate(code_cells_raw):
        if not isinstance(cell_lines, list): print(f"Avertissement: Elem {i} n'est pas une liste. Ignoré.", file=sys.stderr); continue
        content = "".join(cell_lines).strip(); line_count = content.count('\n') + 1
        escaped_content = html.escape(content); cells.append({"content": escaped_content, "lines": line_count})
    print(f"  {len(cells)} cellules préparées.")
    return cells


def distribute_cells_to_pages(cells, max_lines_per_column, num_columns=NUM_COLUMNS):
    """Distribue les cellules. Garantit de retourner au moins une page vide."""
    # CORRECTION: Gérer le cas où il n'y a pas de cellules en entrée
    if not cells:
        print(f"Avertissement (Max={max_lines_per_column}): Aucune cellule à distribuer. Retourne une page vide.")
        # Retourne une structure de page valide mais vide
        return [[[] for _ in range(num_columns)]]

    pages_data = []
    current_page_columns = [[] for _ in range(num_columns)]
    current_col_lines = [0] * num_columns
    col_index = 0 # Index où essayer d'insérer la prochaine cellule

    for i, cell in enumerate(cells): # Ajout de l'index pour debug
        cell_lines = cell['lines']
        cell_content = cell['content']
        #print(f"  Cell {i+1}/{len(cells)} (l={cell_lines}), trying from col {col_index}")

        found_placement = False
        search_idx = col_index
        while search_idx < num_columns:
            if current_col_lines[search_idx] == 0 or (current_col_lines[search_idx] + cell_lines <= max_lines_per_column):
                # Placement possible
                if current_col_lines[search_idx] == 0 and cell_lines > max_lines_per_column:
                     print(f"Avertissement (Max={max_lines_per_column}): Cellule ({cell_lines} lignes) > MAX mais placée seule col {search_idx + 1}.", file=sys.stderr)

                current_page_columns[search_idx].append(cell_content)
                current_col_lines[search_idx] += cell_lines
                #print(f"    Placed in col {search_idx}. New height: {current_col_lines[search_idx]}")
                found_placement = True

                # Déterminer où chercher pour la prochaine cellule
                # Si la colonne actuelle est pleine, passer à la suivante
                if current_col_lines[search_idx] >= max_lines_per_column:
                    col_index = search_idx + 1
                else:
                    # Sinon, rester sur cette colonne pour la prochaine tentative
                    col_index = search_idx
                break # Sortir de la boucle while de recherche
            search_idx += 1 # Essayer la colonne suivante sur cette page

        # Si on n'a pas trouvé de place sur la fin de la page actuelle
        if not found_placement:
            #print(f"    No place found starting from col {col_index}. Creating new page.")
            # Sauvegarder la page actuelle (si elle contient qqc)
            if any(current_col_lines):
                pages_data.append(current_page_columns)
                #print(f"    Saved page {len(pages_data)}. Heights: {current_col_lines}")

            # Nouvelle page
            current_page_columns = [[] for _ in range(num_columns)]
            current_col_lines = [0] * num_columns

            # Placer la cellule dans la première colonne de la nouvelle page
            if cell_lines > max_lines_per_column:
                print(f"Avertissement (Max={max_lines_per_column}): Cellule ({cell_lines} lignes) > MAX sur nouvelle page, colonne 1.", file=sys.stderr)
            current_page_columns[0].append(cell_content)
            current_col_lines[0] += cell_lines
            #print(f"    Placed in col 0 (new page). New height: {current_col_lines[0]}")

            # La prochaine cellule commencera sa recherche en colonne 1 (si col 0 est pleine) ou 0
            if current_col_lines[0] >= max_lines_per_column:
                 col_index = 1
            else:
                 col_index = 0

        # Si on vient de remplir la dernière colonne, forcer une nouvelle page au prochain tour
        if col_index >= num_columns:
             #print(f"    Last column potentially filled, ensuring new page next.")
             pages_data.append(current_page_columns)
             #print(f"    Saved page {len(pages_data)}. Heights: {current_col_lines}")
             current_page_columns = [[] for _ in range(num_columns)]
             current_col_lines = [0] * num_columns
             col_index = 0


    # Ajouter la toute dernière page si elle n'est pas vide
    if any(current_col_lines):
        pages_data.append(current_page_columns)
        #print(f"    Saved final page {len(pages_data)}. Heights: {current_col_lines}")

    # CORRECTION: S'assurer qu'il y a au moins une page vide si pages_data est resté vide
    if not pages_data:
        print(f"Avertissement (Max={max_lines_per_column}): Distribution a résulté en 0 pages. Retourne une page vide.")
        return [[[] for _ in range(num_columns)]]

    return pages_data


def generate_html_content(all_distributions_data):
    """Génère le HTML avec les échappements JS/Vue corrigés."""
    print("Génération du contenu HTML...")
    html_content = f"""
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visualisation du Code</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css" rel="stylesheet" />
    <style>
        body {{ font-family: sans-serif; }}
        pre[class*="language-"] {{ margin: 0 0 0.5rem 0; border-radius: 0.5rem; padding: 0.8rem; font-size: 0.875rem; line-height: 1.4; overflow-x: auto; }}
        .column-content {{ display: flex; flex-direction: column; height: 100%; overflow: hidden; }}
        code[class*="language-"] {{ display: block; }}
        button:disabled {{ opacity: 0.5; cursor: not-allowed; }}
        .page-container {{ min-height: 75vh; }}
        .max-lines-btn.active {{ background-color: #2563eb; color: white; font-weight: bold; }}
        .max-lines-btn {{ transition: background-color 0.2s ease-in-out; }}
    </style>
</head>
<body class="bg-gray-100 p-4">

<div id="app">
    {'''<!-- Choix de MAX_LINES_PER_COLUMN -->'''}
    <div class="flex justify-center items-center space-x-2 mb-1">
        <span class="mr-2 text-sm font-medium text-gray-600">Lignes/colonne max:</span>
        
        <button v-for="linesOption in availableMaxLines" :key="linesOption"
                @click="setMaxLines(linesOption)"
                :class="['max-lines-btn px-3 py-1 border border-gray-300 rounded-md text-sm', {{'active': currentMaxLines === linesOption, 'bg-white hover:bg-gray-100': currentMaxLines !== linesOption}}]">
            {{{{ linesOption }}}}
        </button>
    
        <button @click="prevPage" :disabled="currentPage === 0" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
            Précédent
        </button>
        {'''<!-- Correctement échappé -->'''}
        <span class="text-gray-700 font-medium">Page {{{{ currentPage + 1 }}}} / {{{{ totalPages }}}}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages - 1" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
            Suivant
        </button>
    </div>

    {'''<!-- Grille de code (avec ref) -->'''}
    <div class="grid grid-cols-{NUM_COLUMNS} gap-4 page-container" ref="codeContainer">
         <div v-for="(columnCells, colIdx) in currentPageData" :key="colIdx"
             :class="['p-2 rounded-lg shadow-md column-content', getColumnBgClass(colIdx)]">
             <pre v-for="(cellContent, cellIdx) in columnCells" :key="'cell-' + currentMaxLines + '-' + currentPage + '-' + colIdx + '-' + cellIdx" class="shadow-inner bg-gray-800 text-white">
<code class="language-python" v-html="cellContent"></code></pre>
             {'''<!-- Placeholder si la colonne est vide -->'''}
             <div v-if="!columnCells || columnCells.length === 0" class="h-full w-full flex-grow"></div>
        </div>
    </div>

</div>

{'''<!-- Scripts JS (Prism, Vue) -->'''}
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js" data-autoloader-path="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/"></script>
<script>
    const {{ createApp, ref, computed, nextTick, watch }} = Vue; // Echappement {{}}

    const allDistributions = {json.dumps(all_distributions_data, indent=None)};
    const numColumns = {NUM_COLUMNS};
    const initialMaxLines = {INITIAL_MAX_LINES};
    const availableMaxLinesOptions = Object.keys(allDistributions).map(Number).sort((a, b) => a - b);
    // Créer une structure de page vide par défaut en JS
    const defaultEmptyPage = [Array.from({{ length: numColumns }}, () => [])]; // Echappement {{}}

    createApp({{ // Echappement {{}}
        setup() {{ // Echappement {{}}
            const availableMaxLines = ref(availableMaxLinesOptions);
            const currentMaxLines = ref(initialMaxLines);
            const currentPage = ref(0);
            const codeContainer = ref(null);

            const currentDistribution = computed(() => {{ // Echappement {{}}
                // CORRECTION: Utiliser la structure JS par défaut si la clé n'existe pas
                const distribution = allDistributions[currentMaxLines.value];
                // Vérifier si la distribution est valide (au moins une page)
                if (distribution && distribution.length > 0) {{
                    return distribution;
                }} else {{
                    console.warn(`No valid distribution found for maxLines=${{currentMaxLines.value}}. Using default empty page.`); // Echappement ${{}}
                    return defaultEmptyPage; // Retourne [ [ [], [], [] ] ] par défaut
                }}
            }});

            const totalPages = computed(() => {{ // Echappement {{}}
                 // La longueur de la distribution est le nombre de pages
                 return currentDistribution.value.length; // Pas besoin de +1 ou de fallback ici car currentDistribution garantit au moins une page
            }});

            const currentPageData = computed(() => {{ // Echappement {{}}
                if (currentPage.value >= totalPages.value) {{
                     currentPage.value = 0;
                }}
                // Accéder à la page (qui est garantie d'exister par currentDistribution)
                const page = currentDistribution.value[currentPage.value];

                 // Assurer que la page a toujours numColumns colonnes
                 let finalPage = [...page]; // Copie
                 while (finalPage.length < numColumns) {{ finalPage.push([]); }}
                return finalPage.slice(0, numColumns);
            }});

            const highlightCode = () => {{ // Echappement {{}}
                nextTick(() => {{ // Echappement {{}}
                    const container = codeContainer.value;
                    if (container) {{ Prism.highlightAllUnder(container); }}
                }});
            }};

            const setMaxLines = (lines) => {{ // Echappement {{}}
                if (currentMaxLines.value !== lines) {{
                    currentMaxLines.value = lines;
                    currentPage.value = 0;
                }}
            }};

             const nextPage = () => {{ if (currentPage.value < totalPages.value - 1) {{ currentPage.value++; }} }}; // Echappement {{}}
             const prevPage = () => {{ if (currentPage.value > 0) {{ currentPage.value--; }} }}; // Echappement {{}}

             const getColumnBgClass = (index) => {{ // Echappement {{}}
                const colors = ['bg-gray-50', 'bg-blue-50', 'bg-green-50'];
                return colors[index % colors.length];
             }};

             watch(currentPage, () => {{ highlightCode(); }}); // Echappement {{}}
             watch(currentPageData, () => {{ highlightCode(); }}, {{ deep: true }}); // Echappement {{}} x2

            return {{ // Echappement {{}}
                availableMaxLines, currentMaxLines, currentPage, totalPages, currentPageData,
                codeContainer, setMaxLines, nextPage, prevPage, getColumnBgClass
            }}; // Echappement {{}}
        }} // Echappement {{}}
    }}).mount('#app'); // Echappement {{}}

</script>

</body>
</html>
"""
    print("Contenu HTML généré.")
    return html_content

# --- Main Execution ---
# ... (Le code principal reste identique) ...
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python generate_html.py <input_json_file> <output_html_file>", file=sys.stderr)
        sys.exit(1)
    input_json_file, output_html_file = sys.argv[1], sys.argv[2]

    print(f"Chargement depuis '{input_json_file}'...")
    code_cells_raw = load_code_cells(input_json_file)

    prepared_cells = prepare_cells(code_cells_raw)
    # Ne pas continuer si pas de cellules
    if not prepared_cells:
        print("Erreur : Aucune cellule valide à traiter après préparation. Arrêt.", file=sys.stderr)
        # On pourrait choisir de générer un HTML vide, mais s'arrêter est plus sûr
        sys.exit(1) # Quitter si pas de cellules

    all_distributions = {}
    print("Calcul des distributions de pages...")
    for max_lines in MAX_LINES_OPTIONS:
        print(f"  Calcul pour max_lines = {max_lines}...")
        pages_for_this_limit = distribute_cells_to_pages(prepared_cells, max_lines, NUM_COLUMNS)
        all_distributions[str(max_lines)] = pages_for_this_limit # Utiliser string comme clé JSON est plus sûr
        print(f"    -> {len(pages_for_this_limit)} pages générées.")

    final_html = generate_html_content(all_distributions)

    try:
        with open(output_html_file, "w", encoding="utf-8") as f: f.write(final_html)
        print(f"Fichier HTML '{output_html_file}' généré avec succès.")
    except Exception as e: print(f"Erreur écriture '{output_html_file}': {e}", file=sys.stderr); sys.exit(1)