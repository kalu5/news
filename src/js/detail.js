import '../scss/detail.scss';
import Header from '../components/header/index';
import Iframe from '../components/iframe/index';
import Collector from '../components/collected/index';

const header = new Header (),
      frame = new Iframe (),
      collector = new Collector ();

const App = ($) => {
    const $app = $ ('.app'),
          $list = $app.children ('.lists');
        
    let target = JSON.parse (localStorage.getItem ('target')),
        newsUrl = target.url,
        uniquekey = target.uniquekey;

    let collections = JSON.parse (localStorage.getItem ('collections')) || {},
        collected = Boolean (collections[uniquekey]);
    const init = () => {
        render (newsUrl, collected).then (bindEvent);
    }

    const render = (newsUrl, collected) => {
        return new Promise ((resolve, reject) => {
            _renderHeader ();
            _renderFrame (newsUrl);
            _renderCollector (collected);
            resolve ();
        })
    }

    const _renderHeader = () => {
        $app.append (header.tpl ({
            title: '新闻详情',
            backShow: true,
            collectionShow: false
        }));
    }

    const _renderFrame = (newsUrl) => {
        $list.append (frame.tpl (newsUrl));
    }

    const _renderCollector = (collected) => {
        $app.append (collector.tpl (collected));
    }

    const bindEvent = () => {
        $ ('.collector').on ('click', changeCollected);
    }

    function changeCollected () {
        if (collections[uniquekey]) {
            delete collections[uniquekey];
            collected = false;
        } else {
            collections[uniquekey] = JSON.parse (localStorage.getItem ('target'));
            collected = true;
        }
        collector.changeState (collected);
        localStorage.setItem ('collections', JSON.stringify (collections));
    }

    init ();
}

new App (Zepto);