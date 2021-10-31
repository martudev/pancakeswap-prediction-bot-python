
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

    checkIsLoaded() {
        var root = document.getElementById('root')
        var button = root.firstElementChild.children[2].firstElementChild.firstElementChild.querySelector('button')
        if (button != null) {
            return true
        }
        return false
    }

    isWorking() {
        var xpath = "//div[text()='5m']";
        var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var time = matchingElement.parentElement.firstElementChild.textContent
        return (time.split(':').length == 2)
    }

    areMarketsPaused() {
        var xpath = "//h2[text()='Markets Paused']";
        var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        return (matchingElement != null)
    }
    
    onLoadedApp() {
        console.log('loaded')
        this.callback({
            isLoaded: true,
            isWorking: this.isWorking(),
            areMarketsPaused: this.areMarketsPaused(),
        })
        clearInterval(this.intervalId)
    }

    onFinish(callback) {
        this.callback = callback
    }
    
}

new BotChecker().onFinish((data) => {
    console.log(data)
})