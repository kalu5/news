import { HTTP } from '../utils/http';

class IndexModel extends HTTP {
    getNewsList (field, showCount) {
        return new Promise ((resolve, reject) => {
            this.ajax ({
                url: 'Juhe/getNewsList',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    field: field
                },
                success: function (data) {
                    let res = data.result.data,
                        len = res.length;

                    let newsData = [],
                        index = 0;

                    while (index < len) {
                        newsData.push (res.slice (index, index+=showCount));
                    }
                    resolve (newsData);
                },
                error: function (err) {
                    resolve (404);
                }
            })
        })
    }
}

export { IndexModel };