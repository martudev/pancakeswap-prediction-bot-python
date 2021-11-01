
class BotChecker {

    intervalId;
    callback;

    constructor() {

        var intervalId = setInterval(() => {
            var isLoaded = this.checkIsLoaded()
            if (isLoaded === true) {
                var eventLoadedApp = new Event('BotChecker.AppLoaded');
                window.dispatchEvent(eventLoadedApp)
            }
        }, 300)

        this.intervalId = intervalId
        console.log(this.intervalId)
        window.addEventListener('BotChecker.AppLoaded', () => this.onLoadedApp(), false)
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    checkIsLoaded() {
        var root = document.getElementById('root')
        var button = root.firstElementChild.children[2].firstElementChild.firstElementChild.querySelector('button')
        if (button != null) {
            return true
        }
        return false
    }

    async isWorking() {
        var xpath = "//div[text()='5m']";
        var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var timeNode = matchingElement.parentElement.firstElementChild
        var timeSeconds = parseInt(timeNode.textContent.split(':').slice(-1), 10)
        await this.sleep(2000)
        var timeSecondsFuture = parseInt(timeNode.textContent.split(':').slice(-1), 10)
        return (timeSeconds != timeSecondsFuture)
    }

    areMarketsPaused() {
        var xpath = "//h2[text()='Markets Paused']";
        var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        return (matchingElement != null)
    }
    
    async onLoadedApp() {
        console.log('loaded')
        clearInterval(this.intervalId)
        this.callback({
            isLoaded: true,
            isWorking: await this.isWorking(),
            areMarketsPaused: this.areMarketsPaused(),
        })
    }

    onFinish(callback) {
        this.callback = callback
    }
    
}

new BotChecker().onFinish((data) => {
    console.log(data)
})