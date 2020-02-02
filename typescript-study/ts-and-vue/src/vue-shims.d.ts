// tell ts that anything imported that ends with .vue has the same shape of Vue constructor itself
declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
