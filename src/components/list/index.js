import './index.scss';
import tpl1 from './tpl/pic-0.tpl';
import tpl2 from './tpl/pic-1.tpl';
import tpl3 from './tpl/pic-2.tpl';
import tpl4 from './tpl/pic-3.tpl';
import reg from '../../utils/tools';

export default () => {
    return {
        name: 'newsList',
        tpl (data, pageNum) {
            let list = '',
                template;

            data.forEach ((elem, index) => {
                if (!elem.thumbnail_pic_s) {
                    template = tpl1;
                } else if (elem.thumbnail_pic_s && !elem.thumbnail_pic_s02) {
                    template = tpl2;
                } else if (elem.thumbnail_pic_s02 && !elem.thumbnail_pic_s03) {
                    template = tpl3;
                } else if (elem.thumbnail_pic_s03) {
                    template = tpl4;
                }

                list += template().replace (reg.tplReplace (), (node, key) => {
                    return {
                        index,
                        pageNum,
                        url: elem.url,
                        uniquekey: elem.uniquekey,
                        title: elem.title,
                        date: elem.date,
                        author: elem.author_name,
                        thumbnail_pic_s: elem.thumbnail_pic_s,
                        thumbnail_pic_s02: elem.thumbnail_pic_s02,
                        thumbnail_pic_s03: elem.thumbnail_pic_s03
                    }[key];
                });
            });
            return list;
        }
    }
}