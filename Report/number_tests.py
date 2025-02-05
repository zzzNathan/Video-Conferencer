# This script will add numbers to all the tests in our Development.tex file

import re

def add_test_numbers(filename):
    with open(filename, 'r') as file:
        content = file.read()
    
    # Pattern to match test sections, handles both cases:
    # {\sffamily Tests:} and {\sffamily Tests: }
    test_count = 1
    pattern = r'(\\sffamily Tests:\s*})'
    
    # Function to replace matches with numbered version
    def number_test(match):
        nonlocal test_count
        numbered = f'\\sffamily Tests: ({test_count})}}'
        test_count += 1
        return numbered
    
    # Replace all occurrences
    modified_content = re.sub(pattern, number_test, content)
    
    # Write back to file
    with open(filename, 'w') as file:
        file.write(modified_content)
    
    print(f"Added numbers to {test_count-1} test sections")

# Usage
filename = "./Development.tex"
add_test_numbers(filename)
