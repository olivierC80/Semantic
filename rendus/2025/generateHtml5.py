import json
import html
import sys
import os

# --- Constantes ---
MAX_LINES_PER_COLUMN = 50
NUM_COLUMNS = 3

# --- Fonctions ---

def load_code_cells(json_filepath):
    """Charge les données des cellules de code depuis un fichier JSON."""
    if not os.path.exists(json_filepath):
        print(f"Erreur : Le fichier d'entrée '{json_filepath}' n'existe pas.", file=sys.stderr)
        sys.exit(1)

    try:
        with open(json_filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
    except json.JSONDecodeError:
        print(f"Erreur : Impossible de décoder le JSON dans '{json_filepath}'. Vérifiez le format.", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Erreur inattendue lors de la lecture de '{json_filepath}': {e}", file=sys.stderr)
        sys.exit(1)

    if "code_cells" not in data or not isinstance(data["code_cells"], list):
        print(f"Erreur : La clé 'code_cells' est manquante ou n'est pas une liste dans '{json_filepath}'.", file=sys.stderr)
        sys.exit(1)

    return data['code_cells']

def prepare_cells(code_cells_raw):
    """Prépare les cellules : joint les lignes, compte les lignes et échappe le HTML."""
    cells = []
    for i, cell_lines in enumerate(code_cells_raw):
        if not isinstance(cell_lines, list):
             print(f"Avertissement : L'élément {i} dans 'code_cells' n'est pas une liste. Ignoré.", file=sys.stderr)
             continue

        # Joindre les lignes, en s'assurant qu'il n'y a pas de double \n à la fin
        content = "".join(cell_lines).strip()
        # Compter le nombre de lignes effectives après le strip final
        line_count = content.count('\n') + 1
        # Échapper le HTML pour l'affichage sûr dans <pre><code>
        escaped_content = html.escape(content)
        cells.append({"content": escaped_content, "lines": line_count})
    return cells

def distribute_cells_to_pages(cells):
    """Distribue les cellules préparées dans les colonnes et les pages."""
    pages_data = []
    current_page_columns = [[] for _ in range(NUM_COLUMNS)]
    current_col_lines = [0] * NUM_COLUMNS
    col_index = 0

    for cell in cells:
        cell_lines = cell['lines']
        cell_content = cell['content']

        # Tente de trouver une colonne où la cellule peut rentrer
        found_column = False
        start_col_index = col_index # Pour éviter une boucle infinie si une cellule est trop grande pour n'importe quelle colonne
        while True:
            # Si la colonne actuelle peut accueillir la cellule (ou si elle est vide)
            if current_col_lines[col_index] == 0 or current_col_lines[col_index] + cell_lines <= MAX_LINES_PER_COLUMN:
                found_column = True
                break # Sortir de la boucle while, on a trouvé une colonne

            # Si on n'a pas trouvé et qu'on a testé toutes les colonnes restantes sur cette page
            col_index += 1
            if col_index >= NUM_COLUMNS:
                 break # On doit passer à la page suivante

            # Si on a fait un tour complet sans trouver (cas d'une cellule très grande), on la mettra dans la première colonne dispo
            if col_index == start_col_index:
                 # On n'a pas trouvé de place, on va forcer dans la colonne 'start_col_index' même si ça dépasse
                 col_index = start_col_index # Revenir à la colonne de départ
                 found_column = True # On va la mettre ici
                 break


        # Si on a testé toutes les colonnes et qu'aucune ne convient, on passe à la page suivante
        if not found_column:
            pages_data.append(current_page_columns) # Ajouter la page complétée
            # Réinitialiser pour la nouvelle page
            current_page_columns = [[] for _ in range(NUM_COLUMNS)]
            current_col_lines = [0] * NUM_COLUMNS
            col_index = 0
            # On *doit* mettre la cellule dans la première colonne de la nouvelle page
            found_column = True # Important pour l'ajout ci-dessous

        # --- Ajout de la cellule ---
        # Vérifier si la cellule dépasse même dans une colonne vide (avertissement)
        if current_col_lines[col_index] == 0 and cell_lines > MAX_LINES_PER_COLUMN:
             print(f"Avertissement : La cellule commençant par '{cell_content[:50].replace('<br>', ' ')}...' contient {cell_lines} lignes, ce qui dépasse la limite de {MAX_LINES_PER_COLUMN} lignes par colonne. Elle sera placée seule dans la colonne {col_index + 1}.", file=sys.stderr)

        # Ajouter la cellule à la colonne choisie (ou forcée)
        current_page_columns[col_index].append(cell_content)
        current_col_lines[col_index] += cell_lines

        # Préparer pour la prochaine cellule: passer à la colonne suivante
        # Si la cellule ajoutée était très grande (a rempli ou dépassé même seule),
        # OU si la colonne est maintenant pleine (ou presque, pour éviter qu'une petite cellule force un saut inutile),
        # on passe à la colonne suivante pour la *prochaine* cellule.
        if cell_lines > MAX_LINES_PER_COLUMN or current_col_lines[col_index] >= MAX_LINES_PER_COLUMN * 0.95 : # Seuil ajustable
             col_index += 1
             # Si on vient de remplir la dernière colonne, on doit passer à la page suivante
             if col_index >= NUM_COLUMNS:
                 pages_data.append(current_page_columns)
                 current_page_columns = [[] for _ in range(NUM_COLUMNS)]
                 current_col_lines = [0] * NUM_COLUMNS
                 col_index = 0
        # Sinon (la cellule n'a pas rempli la colonne), on reste sur la même colonne pour la prochaine cellule


    # Ajouter la dernière page si elle contient quelque chose
    if any(any(col) for col in current_page_columns):
        pages_data.append(current_page_columns)

    return pages_data

def generate_html_content(pages_data):
    """Génère la chaîne de caractères HTML complète."""
    # Utilisation de f-string pour le template
    html_content = f"""
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visualisation du Code</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    {'''<!-- Prism.js CSS (Thème Okaidia) -->'''}
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css" rel="stylesheet" />
    <style>
        body {{ font-family: sans-serif; }}
        pre[class*="language-"] {{
            margin: 0 0 0.5rem 0; /* Espace sous chaque pre */
            border-radius: 0.5rem; /* Correspond à rounded-lg */
            padding: 0.8rem;
             font-size: 0.875rem; /* text-sm */
             line-height: 1.4;
             overflow-x: auto; /* Scroll horizontal si besoin DANS le pre */
        }}
         .column-content {{
            /* Ce conteneur ne doit pas avoir de scroll vertical */
            display: flex;
            flex-direction: column;
            height: 100%; /* Occupe la hauteur de la cellule de grille */
            overflow: hidden; /* Empêche le contenu de déborder verticalement */
         }}

         /* Ajustement pour que le code ne déborde pas horizontalement si trop long,
            mais PRISM gère souvent mieux avec white-space: pre par défaut + overflow-x: auto */
         code[class*="language-"] {{
            /* white-space: pre-wrap; */ /* Alternative si overflow-x ne suffit pas */
            /* word-wrap: break-word; */
            display: block;
        }}
        button:disabled {{
            opacity: 0.5;
            cursor: not-allowed;
        }}
        /* Hauteur minimale pour les pages pour éviter le "saut" de la pagination */
        .page-container {{ min-height: 75vh; }}
    </style>
</head>
<body class="bg-gray-100 p-4">
 
<div id="app" >
   <div class="flex justify-center items-center space-x-4 mb-1">  {'''<!-- Marge en bas pour espacer de la grille -->'''}
        <button @click="prevPage" :disabled="currentPage === 0"
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md shadow transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
            Précédent
        </button>
        <span class="text-gray-700 font-medium">Page {{{{ currentPage + 1 }}}} / {{{{ totalPages }}}}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages - 1"
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md shadow transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
            Suivant
        </button>
    </div>

    {'''<!-- Conteneur de la page actuelle -->'''}
    <div class="grid grid-cols-3 gap-4 mb-4 page-container">
        {'''<!-- Colonne -->'''}
        <div v-for="(columnCells, colIdx) in currentPageData" :key="colIdx"
             :class="['p-2 rounded-lg shadow-md column-content', getColumnBgClass(colIdx)]">
             {'''<!-- Cellule de code dans la colonne -->'''}
             <pre v-for="(cellContent, cellIdx) in columnCells" :key="cellIdx"
                  class="shadow-inner bg-gray-800 text-white">
<code class="language-python" v-html="cellContent"></code></pre>
             {'''<!-- Placeholder si colonne vide pour garder la structure -->'''}
             <div v-if="columnCells.length === 0" class="h-full w-full flex-grow"></div>
        </div>
    </div>



</div>

{'''<!-- Prism.js JS -->'''}
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js" data-autoloader-path="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/"></script>
{'''<!-- Charger explicitement Python n'est plus nécessaire avec l'autoloader bien configuré -->'''}

<script>
    const {{ createApp, ref, computed, nextTick, watch }} = Vue;

    // Les données des pages générées par Python
    const pagesData = {json.dumps(pages_data, indent=None)}; // Injection JSON

    createApp({{
        data() {{
            return {{
                pages: pagesData,
                currentPage: 0
            }};
        }},
        computed: {{
            totalPages() {{
                return this.pages.length > 0 ? this.pages.length : 1; // Au moins 1 page même si vide
            }},
            currentPageData() {{
                 // Gère le cas où il n'y a pas de pages (totalPages serait 1 mais this.pages[0] serait undefined)
                if (!this.pages || this.pages.length === 0) {{
                     return [[], [], []]; // Structure vide à 3 colonnes
                }}
                // Assure que même la dernière page a toujours 3 colonnes (potentiellement vides)
                let page = this.pages[this.currentPage] || []; // Prend la page ou un tableau vide si index hors limites
                while (page.length < {NUM_COLUMNS}) {{
                    page.push([]);
                }}
                return page.slice(0, {NUM_COLUMNS}); // Assure qu'il n'y a que NUM_COLUMNS colonnes
            }}
        }},
        methods: {{
            nextPage() {{
                if (this.currentPage < this.totalPages - 1) {{
                    this.currentPage++;
                }}
            }},
            prevPage() {{
                if (this.currentPage > 0) {{
                    this.currentPage--;
                }}
            }},
            highlightCode() {{
                // Attendre que le DOM soit mis à jour par Vue
                nextTick(() => {{
                    // Utiliser Prism pour colorer tous les blocs de code sur la page actuelle
                    Prism.highlightAll(this.$el); // Cible l'élément racine de l'app Vue
                    // console.log("Prism highlighting applied on page " + (this.currentPage + 1));
                }});
            }},
            getColumnBgClass(index) {{
              // Des fonds légèrement différents pour distinguer les colonnes
              const colors = ['bg-gray-50', 'bg-blue-50', 'bg-green-50'];
              // Si vous préférez la même couleur : ['bg-white', 'bg-white', 'bg-white']
              return colors[index % colors.length];
            }}
        }},
        mounted() {{
            this.highlightCode(); // Coloration initiale
        }},
         update() {{
            this.highlightCode(); // Coloration initiale
        }},
        watch: {{
            // Re-colorer quand la page change
            currentPage() {{
                this.highlightCode();
            }}
        }}
    }}).mount('#app');

</script>

</body>
</html>
"""
    return html_content

# --- Main Execution ---
if __name__ == "__main__":
    # 1. Vérifier les arguments de ligne de commande
    if len(sys.argv) != 3:
        print("Usage: python generate_html.py <input_json_file> <output_html_file>", file=sys.stderr)
        print("Exemple: python generate_html.py code_cells.json output.html", file=sys.stderr)
        sys.exit(1)

    input_json_file = sys.argv[1]
    output_html_file = sys.argv[2]

    # 2. Charger les données du JSON
    print(f"Chargement des cellules depuis '{input_json_file}'...")
    code_cells_raw = load_code_cells(input_json_file)

    # 3. Préparer les cellules
    print("Préparation des cellules...")
    cells = prepare_cells(code_cells_raw)
    if not cells:
        print("Avertissement : Aucune cellule de code valide trouvée après préparation.", file=sys.stderr)
        # On continue pour générer un HTML vide avec la structure

    # 4. Distribuer les cellules dans les pages
    print("Distribution des cellules dans les pages et colonnes...")
    pages_data = distribute_cells_to_pages(cells)
    num_pages = len(pages_data)
    print(f"Distribution terminée. {num_pages} page(s) créée(s).")

    # 5. Générer le contenu HTML
    print("Génération du contenu HTML...")
    final_html = generate_html_content(pages_data)

    # 6. Écrire le fichier HTML de sortie
    try:
        with open(output_html_file, "w", encoding="utf-8") as f:
            f.write(final_html)
        print(f"Fichier HTML '{output_html_file}' généré avec succès.")
    except Exception as e:
        print(f"Erreur lors de l'écriture du fichier '{output_html_file}': {e}", file=sys.stderr)
        sys.exit(1)