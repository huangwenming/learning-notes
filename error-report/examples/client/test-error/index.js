import ErrorReport from '../../../index.js';

let errorHandler = new ErrorReport({
    supportType: 'window',
    project: 'test',
    collectAddress: 'http://localhost:8585/middleware/errorMsg/',
    sourceMapAddress: 'http://localhost:8585/client/test-error/'
});
errorHandler.enableCatchError();

console.log(a);
