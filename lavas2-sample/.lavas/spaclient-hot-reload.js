import 'eventsource-polyfill';
import hotClient from 'webpack-hot-middleware/client?name=spaclient&noInfo=true&reload=true';


    hotClient.subscribe(payload => {
        if (payload.action === 'reload' || payload.reload === true) {
            window.location.reload();
        }
    });

