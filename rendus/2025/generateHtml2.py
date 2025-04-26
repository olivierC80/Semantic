#!/usr/bin/env python3
# generate_html.py

import json
import sys
from pathlib import Path

def paginate_cells(code_cells, max_lines=34, n_cols=3):
    """
    Crée les pages en Python selon la contrainte :
    - chaque page a n_cols colonnes
    - chaque colonne contient des cellules entières sans dépasser max_lines
    Retourne une liste de pages, où chaque page est
    { 'cols': [ [cell1, cell2, ...], [...], [...] ] }
    """
    pages = []
    current_page = {'cols': [[] for _ in range(n_cols)]}
    col_heights = [0] * n_cols

    for cell in code_cells:
        length = len(cell)
        placed = False
        # Tenter de placer la cellule dans la première colonne disponible
        for ci in range(n_cols):
            if col_heights[ci] + length <= max_lines:
                current_page['cols'][ci].append(cell)
                col_heights[ci] += length
                placed = True
                break
        # Si aucune colonne ne peut contenir la cellule, finaliser la page et recommencer
        if not placed:
            pages.append(current_page)
            current_page = {'cols': [[] for _ in range(n_cols)]}
            col_heights = [0] * n_cols
            # Placer la cellule dans la première colonne de la nouvelle page
            current_page['cols'][0].append(cell)
            col_heights[0] = length

    # Ajouter la dernière page si elle contient du contenu
    if any(current_page['cols']):
        pages.append(current_page)

    return pages


def generate_html(pages, out_html):
    """
    Génère un fichier HTML autonome avec Tailwind CSS et Vue.js,
    affichant les pages pré-calculées (sans défilement vertical).
    """
    # Sérialiser les pages en JSON
    pages_json = json.dumps(pages, ensure_ascii=False)

    # Construire le HTML ligne par ligne
    html_lines = []
    html_lines.append('<!DOCTYPE html>')
    html_lines.append('<html lang="fr">')
    html_lines.append('<head>')
    html_lines.append('  <meta charset="UTF-8">')
    html_lines.append('  <meta name="viewport" content="width=device-width, initial-scale=1.0">')
    html_lines.append('  <title>Navigation Code Cells</title>')
    html_lines.append('  <script src="https://cdn.tailwindcss.com"></script>')
    html_lines.append('  <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>')
    html_lines.append('   <link href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.css" rel="stylesheet" />')
    html_lines.append(' <script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>')
    html_lines.append(' <script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-python.min.js"></script>')
    html_lines.append('</head>')
    html_lines.append('<body class="p-4">')
    html_lines.append('  <div id="app">')
    html_lines.append('    <div class="grid grid-cols-3 gap-4">')
    html_lines.append('      <div v-for="(column, ci) in pages[currentPage].cols" :key="ci" class="bg-blue-100 p-2 max-h-full overflow-hidden">')
    html_lines.append('        <div v-for="(cell, k) in column" :key="k" class="mb-4">')
    html_lines.append('          <pre class="rounded-xl overflow-x-auto shadow-md p-2 bg-white"><code class="language-python">{{ cell.join(\'\') }}</code></pre>')
    html_lines.append('        </div>')
    html_lines.append('      </div>')
    html_lines.append('    </div>')
    html_lines.append('    <div class="flex justify-between items-center mt-4">')
    html_lines.append('      <button @click="prevPage" :disabled="currentPage===0" class="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50">← Précédent</button>')
    html_lines.append('      <span>Page {{ currentPage+1 }} / {{ pages.length }}</span>')
    html_lines.append('      <button @click="nextPage" :disabled="currentPage>=pages.length-1" class="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50">Suivant →</button>')
    html_lines.append('    </div>')
    html_lines.append('  </div>')
    html_lines.append('  <script>')
    html_lines.append('  // Données paginées calculées en Python')
    html_lines.append(f'  const pages = {pages_json};')
    html_lines.append('  new Vue({')
    html_lines.append("    el: '#app',")
    html_lines.append('    data: {')
    html_lines.append('      pages: pages,')
    html_lines.append('      currentPage: 0')
    html_lines.append('    },')
    html_lines.append('    methods: {')
    html_lines.append('      nextPage() {')
    html_lines.append('        if (this.currentPage < this.pages.length - 1) {')
    html_lines.append('          this.currentPage++;')
    html_lines.append('        }')
    html_lines.append('      },')
    html_lines.append('      prevPage() {')
    html_lines.append('        if (this.currentPage > 0) {')
    html_lines.append('          this.currentPage--;')
    html_lines.append('        }')
    html_lines.append('      }')
    html_lines.append('    }')
    html_lines.append('  });')
    html_lines.append('  </script>')
    html_lines.append('</body>')
    html_lines.append('</html>')

    # Écrire le HTML final
    html_content = "\n".join(html_lines)
    Path(out_html).write_text(html_content, encoding='utf-8')
    print(f"✅ HTML généré dans : {out_html} (Total pages: {len(pages)})")

def main():
    if len(sys.argv) != 3:
        print("Usage: python generate_html.py code_cells.json output.html")
        sys.exit(1)

    json_in, html_out = sys.argv[1], sys.argv[2]
    data = json.loads(Path(json_in).read_text(encoding='utf-8'))
    code_cells = data.get('code_cells', [])

    # Création des pages une fois pour toutes
    pages = paginate_cells(code_cells)
    generate_html(pages, html_out)

if __name__ == "__main__":
    main()
