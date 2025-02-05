# This script add the minted options:
# [linenos, bgcolor=lightestgray, breaklines, breakanywhere]
# to every code snippet in a latex file
import re

# The options we want to add
new_options = "linenos, bgcolor=lightestgray, breaklines, breakanywhere"

def process_file(filename):
    with open(filename, 'r') as file:
        content = file.read()

    # Pattern to match \begin{minted}[options]{language}
    pattern = r'\\begin{minted}\[([^\]]*)\]'

    # Pattern to match \begin{minted}{language}
    pattern2 = r'\\begin{minted}{([^}]*)}'

    # Replace existing options or add new options
    def replace_with_options(match):
        return f'\\begin{{minted}}[{new_options}]'

    # Process content
    content = re.sub(pattern, replace_with_options, content)
    content = re.sub(pattern2, r'\\begin{minted}[' + new_options + r']{\1}', content)

    # Write the modified content back to file
    with open(filename, 'w') as file:
        file.write(content)

# Usage
process_file("./Development.tex")
process_file("./Appendix.tex")
