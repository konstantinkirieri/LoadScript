function testZero() {
    console.log('0')
}

class WorkScripts{
    constructor(){
        this.promises = [];
        this.urls = [];
    }

    startLoad(url, callback) {
        this.checkUrl(url);
        Promise.all(this.promises).then(callback);
    }

    checkUrl(url) {
        if(Array.isArray(url)) {
            for(let u of url) {
                if(!this.urls.includes(u)) this.loadScript(u);
            }
        } else if ( (typeof(url) == 'string') && (!this.urls.includes(url)) ) {
            this.loadScript(url);
        } else if (typeof(url) == 'function') {
            url();
        }
    }

    loadScript(url) {
        this.urls.push(url);
        const element = document.createElement("script");
        element.type = "text/javascript";
        element.src = url;
        const p = new Promise(resolve => {
            element.onload = resolve;
        });
        this.promises.push(p);

        document.body.appendChild(element);
    }
}

const userScripts = new WorkScripts();

userUrls = ['js/testA.js', 'js/testB.js', 'js/testC.js']

userScripts.startLoad(userUrls, () => {
    testB();
    testC();
    testA();
});
userScripts.startLoad('js/testA.js', () => testA());
userScripts.startLoad(testZero, () => testB());
userScripts.startLoad('js/testC.js', () => testC());