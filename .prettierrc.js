module.exports = {
  printWidth: 100, // 一行的字符数，超过会进行换行，默认为80，官方建议设100-120
  tabWidth: 2, // 一个 tab 代表几个空格数，默认 2
  useTabs: false, // 启用 tab 取代空格符缩进，默认 false
  semi: false, // 行尾是否使用分号，默认 true
  singleQuote: true, // 字符串是否使用单引号，默认为 false
  quoteProps: 'as-needed', // 是否给对象的属性要加上引号，默认为 as-needed
  trailingComma: 'none', // 键值对后面是否使用尾逗号，有三个可选值 "<none|es5|all>"，默认 es5
  bracketSpacing: true // 对象大括号直接是否有空格，默认 true，效果：{ foo: bar }
}
