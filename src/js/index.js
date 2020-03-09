import '../scss/index.scss';
import Header from '../components/header/index';
import Nav from '../components/nav/index';
import newsType from '../utils/data';
import { IndexModel } from '../models/index';
import List from '../components/list/index';
import tools from '../utils/tools';
import Loading from '../components/loading/index';
import BottomLoading from '../components/bloading/index';
import Nonet from '../components/no_net/index';

const header = new Header (),
      nav = new Nav (),
      list = new List (),
      loading = new Loading (),
      bottomLoading = new BottomLoading (),
      nonet = new Nonet ();

const indexModel = new IndexModel ();

const newsData = newsType.news_type;

let field = 'top',
    pageShowCount = 10,
    pageNum = 0,
    pageCount = 0,
    dataCache = [],
    pageBlock = false;

const App = ($, win) => {
    const $app = $ ('#app'),
          $win = $ (win),
          $list = $ ('.news-lists'),
          newScrollToBottom = tools.scrollToBottom.bind (null, scrollToBottom);
    const init = () => {
        render (field, pageShowCount, pageNum).then (bindEvent);
        
    }

    const render = () => {
        return new Promise ((resolve, reject) => {
            _renderHeader ();
            _renderNav (newsData);
            _renderList (field, pageShowCount, pageNum);
            _renderLoading ();
            resolve ();
        })
    }

    const _renderHeader = () => {
        $app.append (header.tpl ({
            title: '新闻头条',
            backShow: false,
            collectionShow: true
        }))
    }

    const _renderNav = (newsData) => {
        let tpl = nav.tpl (newsData);
        $app.append (tpl.scrollStr);
        $ ('.scroll-wrap').append (tpl.itemStr);
    }

    const _renderList = (field, pageShowCount, pageNum) => {
        if (dataCache[field]) {
            pageCount = dataCache[field].length;
            _insetRender ('cover');
        } else {
            _renderLoading ('append');
            indexModel.getNewsList (field, pageShowCount).then (res => {
                if (res === 404) {
                    _renderLoading ('remove');
                    _renderNonet ('append', '请检查网络');
                    return;
                }
                dataCache[field] = res;
                pageCount = dataCache[field].length;
                setTimeout (() => {
                    _insetRender ('cover');
                }, 2000);
            });
        }
          
    }

    const _insetRender = (how) => {
        switch (how) {
            case 'cover':
                $list.html (list.tpl (dataCache[field][pageNum], pageNum));
                windowEvent ('scrollTop');
                _afterRender (true);
                _renderLoading ('remove');
                break;
            case 'append':
                $list.append (list.tpl (dataCache[field][pageNum], pageNum)); 
                _afterRender ();
                break;
            default:
                break;
        }
        pageBlock = false;
        _renderBottomLoading ('remove');
    }

    //预加载渲染图片
    const _afterRender = (isScroll) => {
        isScroll && windowEvent ('scroll');
        tools.thumbShow ($('.thumb-item'));
    }

    const _renderLoading = (how) => {
        switch (how) {
            case 'append':
                $list.html ('');
                $app.append (loading.tpl());
                break;
            case 'remove':
                $ ('.loading').remove ();
        }
        
    }

    const _renderBottomLoading = (how, load, text) => {
        switch (how) {
            case 'append':
                $app.append (bottomLoading.tpl (load, text));
                break;
            case 'remove':
                $ ('.bottom-loading').remove ();
                break;
            case 'removeAndappend':
                $ ('.bottom-loading').remove ();
                $app.append (bottomLoading.tpl (load, text));
                break;
            default: 
                break;
        }
    }

    const _renderNonet = (how, text) => {
        switch (how) {
            case 'append':
                $app.append (nonet.tpl (text));
                break;
            case 'remove':
                $ ('.net-tips').remove ();
                break;
            default: 
                break;
        }
    }

    const bindEvent = () => {
        const $wrap = $ ('.scroll-wrap');
        $wrap.on ('click', '.nav-item', changeItem);
        $list.on ('click', '.list', handelToDetail); 
    }

    const windowEvent = (how, delay) => {
        switch (how) {
            case 'scroll':
                $win.on ('scroll', newScrollToBottom);
                break;
            case 'scrollTop':
                setTimeout (() => {
                    win.scrollTo (0, 0);
                }, delay);
                break;
            case 'scrollOff':
                $win.off ('scroll', newScrollToBottom);
                break;
            default: 
                break;
        }
    }

    function changeItem () {
        pageNum = 0;
        _renderNonet ('remove');
        _renderBottomLoading ('remove');
        windowEvent ('scrollOff');
        windowEvent ('scrollTop')
        const $this = $ (this);
        field = $this.attr ('data-type');
        $this.addClass ('active').siblings ('.nav-item').removeClass ('active');
        _renderList (field, pageShowCount, pageNum);
    }

    function scrollToBottom () {
        if (pageNum < pageCount - 1) {
            if (!pageBlock) {
                pageBlock = true;
                _renderBottomLoading ('append', true, '正在努力加载中...');
                setTimeout (() => {
                    pageNum ++;
                    _insetRender ('append');
                }, 2000); 
            }
        } else {
            _renderBottomLoading ('removeAndappend', false, '已加载全部内容');
        }
    }

    function handelToDetail () {
        let $this = $ (this),
            url = $this.attr ('data-url'),
            uniquekey = $this.attr ('data-uniquekey'),
            pageNum = $this.attr ('data-page'),
            index = $this.attr ('data-index');

        localStorage.setItem ('target', JSON.stringify (dataCache[field][pageNum][index]));
        win.location.href = `detail.html?news_url=${url}&uniquekey=${uniquekey}`;
    }

    init ();
} 

new App (Zepto, window);