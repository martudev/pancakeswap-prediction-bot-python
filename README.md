# pancakeswap-prediction-bot

pancakeswap-prediction-bot es un bot para poder tradear en pancakeswap

## How to start

Requeriments: Python3, Pip3

Install dependencies by `pip install -r requirements.txt`

**we recomend after intalling dependencies to make a venv -> [View tutorial](https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/26/python-virtual-env/)**

### mainnet

Open the **config.json** file and add youre `walletAddress` and `walletPrivateKey`

Run `python file_name.py` and enter a **minbet** and a **basal_multiplier**

### testnet

Run test-net

```
ganache-cli -h 0.0.0.0 -f https://bsc-dataseed.binance.org/
```

Open the **config.json** file and add youre `walletAddress` for **dev** and `walletPrivateKey` for **dev**

Run `python file_name.py` and enter a **minbet** and a **basal_multiplier**

You can check the ammount of bnb by adding youre account to metamask on youre network
