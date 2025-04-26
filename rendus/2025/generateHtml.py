#!/usr/bin/env python3
# generate_html.py

import json
import sys
from pathlib import Path

def paginate_cells(code_cells, max_lines=45, n_cols=3):
    pages = []
    page = {'cols': [[] for _ in range(n_cols)]}
    col_lines = [0] * n_cols
    col_idx = 0

    for cell in code_cells:
        n = len(cell)
        if col_lines[col_idx] + n > max_lines:
            col_idx += 1
            if col_idx >= n_cols:
                pages.append(page)
                page = {'cols': [[] for _ in range(n_cols)]}
                col_lines = [0] * n_cols
                col_idx = 0
        page['cols'][col_idx].append(cell)
        col_lines[col_idx] += n

    if any(page['cols']):
        pages.append(page)
    return pages

def generate_html(pages, out_path):
    pages_json = json.dumps(pages, ensure_ascii=False)

    # On construit le HTML en concaténant pour éviter les conflits d'accolades
    html = """<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Navigation Code Cells</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <!-- Prism.js CSS + Python support -->
  <link href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-python.min.js"></script>
</head>
<body class="p-4">
  <div id="app">
    <div class="grid grid-cols-3 gap-4">
      <div v-for="(column, ci) in pages[currentPage].cols" :key="ci" class="bg-blue-100 p-2 max-h-full overflow-hidden">
        <div v-for="(cell, k) in column" :key="k" class="mb-4">
          <pre class="rounded-xl overflow-x-auto shadow-md p-2 bg-white"><code class="language-python">{{ cell.join('') }}</code></pre>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center mt-4">
      <button @click="prevPage"
              :disabled="currentPage===0"
              class="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50">
        ← Précédent
      </button>
      <span>Page {{ currentPage+1 }} / {{ pages.length }}</span>
      <button @click="nextPage"
              :disabled="currentPage>=pages.length-1"
              class="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50">
        Suivant →
      </button>
    </div>
  </div>

  <script>
  // Injection des données paginées
  const pages = """ + pages_json + """;

  new Vue({
    el: '#app',
    data: {
      pages: pages,
      currentPage: 0
    },
    methods: {
      nextPage() {
        if (this.currentPage < this.pages.length - 1) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 0) {
          this.currentPage--;
        }
      }
    }
  });
  </script>
</body>
</html>
"""

    Path(out_path).write_text(html, encoding='utf-8')
    print(f"✅ Fichier HTML généré : {out_path}")

def main():
    if len(sys.argv) != 3:
        print("Usage: python generate_html.py code_cells.json output.html")
        sys.exit(1)

    json_in, html_out = sys.argv[1], sys.argv[2]
    data = json.loads(Path(json_in).read_text(encoding='utf-8'))
    code_cells = data.get('code_cells', [])
    pages = paginate_cells(code_cells)
    generate_html(pages, html_out)

if __name__ == "__main__":
    main()
