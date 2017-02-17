# fis3-optimizer-compress-tpl

A optimizer for fis to compress php template.

## install

```bash
npm install [-g] fis3-optimizer-compress-tpl
```

## use

In Fis3

### config

In project config file, default is fis-conf.js.

```javascript
fis.match('*.tpl', {
    optimizer: fis.plugin('compress-tpl')
})
```