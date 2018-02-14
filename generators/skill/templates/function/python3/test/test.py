import unittest, json
import ../__main__
class TestFunction(unittest.TestCase):

    def test_req(self):
        with open('test_req.json') as data_file:
            data = json.load(data_file)
            print(main(data))

if __name__ == '__main__':
    unittest.main()