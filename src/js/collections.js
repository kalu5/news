import '../scss/collections.scss';
import Header from '../components/header/index';
import Notip from '../components/no_tip/index';
import List from '../components/list/index';
import tools from '../utils/tools';

const header = new Header (),
      notip = new Notip (),
      list = new List ();

const App = ($, win) => {
    const $app = $ ('.app'),
          $list = $app.children ('.lists');

    let collections = JSON.parse (localStorage.getItem ('collections'));

    const init = () => {
        render (collections).then (bindEvent);
    }

    const render = (collections) => {
        return new Promise ((resolve, reject) => {
            _renderHeader ();
            if (!collections || Object.keys (collections).length === 0) {
                _renderNotip ();
            } else {
                _renderList (collections);
            }
            resolve ();
        })
    }

    const _renderHeader = () => {
        $app.append (header.tpl ({
            title: '我的收藏',
            backShow: true,
            collectionShow: false
        }))
    }

    const _renderList = () => {
        $list.append (list.tpl (changeArray (collections)));
        afterRender ();
    }

    const afterRender = () => {
        tools.thumbShow ($ ('.thumb-item'));
    }

    const changeArray = (collections) => {
        let listArr = [];
        for (let key in collections) {
            listArr.push (collections[key]);
        }
        return listArr;
    }

    const _renderNotip = () => {
        $list.append (notip.tpl ('这里还是空空如也......'));
    }

    const bindEvent = () => {
        $list.on ('click', '.list', handeltoDetail);
    }

    function handeltoDetail () {
        let $this = $ (this),
            url = $this.attr ('data-url'),
            uniquekey = $this.attr ('data-uniquekey');

        localStorage.setItem ('target', JSON.stringify (collections[uniquekey]));
        win.location.href = `detail.html?news_url=${url}&uniquekey=${uniquekey}`;

    }
 
    init ();
}

new App (Zepto, window);