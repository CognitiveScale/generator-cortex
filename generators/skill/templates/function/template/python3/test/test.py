import unittest, json, sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from src.__main__ import main

class TestFunction(unittest.TestCase):

    def test_req(self):
        test_req = os.path.join(os.path.dirname(__file__), "unit_test_req.json")
        with open(test_req) as data_file:
            data = json.load(data_file)
            print(main(data))

if __name__ == '__main__':
    unittest.main()
