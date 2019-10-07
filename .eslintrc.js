module.exports={
        "env": {
          "browser": true,
          "commonjs": true,
          "es6": true
        },
        "extends": "eslint:recommended",
        "globals": {
          "$": true,
          "process": true,
          "__dirname": true
        },
        "parser": "babel-eslint",
        "parserOptions": {
          "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
          },
          "sourceType": "module",
          "ecmaVersion": 7
        },
        "plugins": [
          "react"
        ],
        "rules": {
          // off=0, warn=1, error=2, 如果是数组, 第二项表示参数option
          "indent": [2, 2], // 控制缩进为2
          "eqeqeq": 1,// 警告使用全等
          "no-console": 0, //不禁用console
          "no-debugger": 1, //警告debugger
          "eol-last": 0, //文件以单一的换行符结束
          "no-unused-vars": [1, {"vars": "all", "args": "after-used"}], //不能有声明后未被使用的变量或参数
          //"no-underscore-dangle": 0, //标识符不能以_开头或结尾
          "no-alert": 1, //禁止使用alert confirm prompt
          "camelcase": 0, //制驼峰法命名
          "jsx-quotes": [2, "prefer-double"],//制在JSX属性（jsx-quotes）中一致使用双引号
          "react/display-name": 0, //防止在React组件定义中丢失displayName
          "react/forbid-prop-types": [2, {"forbid": ["any"]}], //禁止某些propTypes
          "react/jsx-closing-bracket-location": 1, //在JSX中验证右括号位置
          "react/jsx-curly-spacing": [2, {"when": "never", "children": true}], //在JSX属性和表达式中加强或禁止大括号内的空格。
          "react/jsx-indent": [2,2], // 语法缩进控
        },
        "settings": {
          "import/ignore": [
            "node_modules"
          ]
        }
      }