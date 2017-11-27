/**
 * Created by huangwenming on 2017/11/27.
 */
import { sayHello } from './module';
import { sayHi } from './module';
const element = document.createElement('h1');
element.innerHTML = sayHello('World') + sayHi('my friend');
document.body.appendChild(element);