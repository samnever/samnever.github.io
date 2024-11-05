twikoo.getCommentsCount({
    envId: 'https://twikooofsamnever.netlify.app/.netlify/functions/twikoo', // 环境 ID
    // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，如果您的环境地域不是上海，需传此参数
    urls: [ // 不包含协议、域名、参数的文章路径列表，必传参数
        '/2024/11/04/sui%20bi/longwaymanman/index.html'
    ],
    includeReply: true // 评论数是否包括回复，默认：false
}).then(function (res) {
    console.log(res);
    // 返回示例: [
    //   { url: '/2020/10/post-1.html', count: 10 },
    //   { url: '/2020/11/post-2.html', count: 0 },
    //   { url: '/2020/12/post-3.html', count: 20 }
    // ]
}).catch(function (err) {
    // 发生错误
    console.error(err);
});