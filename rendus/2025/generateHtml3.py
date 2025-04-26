#!/usr/bin/env python3
# generate_html.py

import json
import sys
from pathlib import Path

# Pagination des cellules

def paginate_cells(code_cells, max_lines=45, n_cols=3):
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
    col_idx = 0

    for cell in code_cells:
        length = len(cell)
        # Cas d'une cellule très longue
        if length > max_lines:
            if any(current_page['cols'][ci] for ci in range(n_cols)):
                pages.append(current_page)
                current_page = {'cols': [[] for _ in range(n_cols)]}
                col_heights = [0] * n_cols
                col_idx = 0
            current_page['cols'][0].append(cell)
            pages.append(current_page)
            current_page = {'cols': [[] for _ in range(n_cols)]}
            col_heights = [0] * n_cols
            col_idx = 0
            continue

        # Placement normal
        if col_heights[col_idx] + length <= max_lines:
            current_page['cols'][col_idx].append(cell)
            col_heights[col_idx] += length
        else:
            col_idx += 1
            if col_idx >= n_cols:
                pages.append(current_page)
                current_page = {'cols': [[] for _ in range(n_cols)]}
                col_heights = [0] * n_cols
                col_idx = 0
            current_page['cols'][col_idx].append(cell)
            col_heights[col_idx] += length

    if any(current_page['cols'][ci] for ci in range(n_cols)):
        pages.append(current_page)

    return pages

def generate_html(pages, out_html):
    pages_json = json.dumps(pages, ensure_ascii=False)
    html_lines = [
"<!DOCTYPE html>",
"<html lang=\"fr\">",
"<head>",
"  <meta charset=\"UTF-8\">",
"  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
"  <title>Navigation Code Cells</title>",
"  <script src=\"https://cdn.tailwindcss.com\"></script>",
"  <script src=\"https://cdn.jsdelivr.net/npm/vue@2\"></script>",
"  <link href=\"https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.css\" rel=\"stylesheet\" />",
"  <script src=\"https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js\"></script>",
"  <script src=\"https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-python.min.js\"></script>",
"</head>",
"<body class=\"p-4\">",
"  <div id=\"app\">",
"    <div class=\"grid grid-cols-3 gap-4\">",
"      <div v-for=\"(column, ci) in pages[currentPage].cols\" :key=\"ci\" class=\"bg-blue-100 p-2 max-h-full overflow-hidden\">",
"        <div v-for=\"(cell, k) in column\" :key=\"k\" class=\"mb-4\">",
"          <pre class=\"rounded-xl overflow-x-auto shadow-md p-2 bg-white\"><code class=\"language-python\">{{ cell.join('') }}</code></pre>",
"        </div>",
"      </div>",
"    </div>",
"    <div class=\"flex justify-between items-center mt-4\">",
"      <button @click=\"prevPage\" :disabled=\"currentPage===0\" class=\"px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50\">← Précédent</button>",
"      <span>Page {{ currentPage+1 }} / {{ pages.length }}</span>",
"      <button @click=\"nextPage\" :disabled=\"currentPage>=pages.length-1\" class=\"px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50\">Suivant →</button>",
"    </div>",
"  </div>",
"  <script>",
"  const pages = " + pages_json + ";",
"  new Vue({",
"    el: '#app',",
"    data: { pages: pages, currentPage: 0 },",
"    methods: {",
"      nextPage() { if (this.currentPage < this.pages.length - 1) { this.currentPage++; } },",
"      prevPage() { if (this.currentPage > 0) { this.currentPage--; } }",
"    },",
"    updated() {",
"      // Re-highlight Prism après chaque rendu de page",
"      this.$nextTick(() => Prism.highlightAll());",
"    }",
"  });",
"  </script>",
"</body>",
"</html>"
    ]

    Path(out_html).write_text("\n".join(html_lines), encoding='utf-8')
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

