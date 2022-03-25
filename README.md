# 😀 iMosyon
A Emotion Prediction thru Word or Sentence.

# ⚙️ Installing dependencies
  * **Python:** Make sure to install the right version of Python 3.8.10 [here](https://www.python.org/downloads/release/python-3810/).<br>
     * Run the command 
        ```bash
        pip install -r requirements.txt
        ```
  * **NodeJS:** Install the curent latest NodeJS from their website.
  * **ReactJS:** run ```npm install``` on project folder for installing all the libraries including ```ReactJS```.
     

# 📝 Core Library

Your prediction model should be added to predict function from the ```back-end/core/predictor.py``` file.

```python
25.    def predict(self, sentence) -> str:
26.        # enter your model here!
27.        pass
```


# 😎  Front-End
The Front-End library the we use is ``` ReactJS ``` and it's located on ```front-end/``` folder.



# 🖥  Make the system run
* **Back-End (Flask)**<br>
    ```zsh
    cd back-end/ && python server.py
    ```
* **Front-End (ReactJS)**<br>
    ```zsh
    cd front-end/ && npm run dev
    ```
**‼️ NOTE:** Run the command separately in a command prompt or terminal.

