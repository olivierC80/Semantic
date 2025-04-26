#!/usr/bin/env python3
# extract_code_cells.py

import json
import sys

def extract_code_cells(infile_path, outfile_path):
    """
    Charge un notebook Jupyter (.ipynb), en extrait toutes les cellules de code
    sans lignes vides, et écrit le résultat dans un fichier JSON.
    """
    # 1. Charger le notebook
    with open(infile_path, 'r', encoding='utf-8') as f:
        nb = json.load(f)

    code_cells = []
    # 2. Parcourir les cellules
    for cell in nb.get('cells', []):
        if cell.get('cell_type') == 'code':
            source = cell.get('source', [])
            # Assurer une liste de lignes
            if isinstance(source, str):
                lines = source.splitlines(keepends=True)
            else:
                lines = source
            # 3. Filtrer les lignes non-vides
            cleaned = [line for line in lines if line.strip() != '']
            code_cells.append(cleaned)

    # 4. Préparer la structure et l'écrire
    output = {'code_cells': code_cells}
    with open(outfile_path, 'w', encoding='utf-8') as f_out:
        json.dump(output, f_out, ensure_ascii=False, indent=2)

    print(f"✅ Extrait {len(code_cells)} cellules de code vers : {outfile_path}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python extract_code_cells.py <input_notebook.ipynb> <output.json>")
        sys.exit(1)
    input_nb = sys.argv[1]
    output_json = sys.argv[2]
    extract_code_cells(input_nb, output_json)
