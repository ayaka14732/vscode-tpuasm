# 开发、打包与发布

## 开发

工具链版本以 `.node-version` 和 `package.json` 的 `packageManager` 为准。

语法入口为 `syntaxes/tpuasm.tmLanguage.json`，编辑行为在 `language-configuration.json`。维护时参考 tpuasm 的语法实现和目标格式文档，注意区分槽名、寄存器与地址上下文；扩展本身不依赖相邻 checkout。

## 打包与验证

```sh
pnpm install --frozen-lockfile
pnpm package
git diff --check
```

产物名称由 `package.json` 的 `name` 和 `version` 决定，可用 `pnpm package --out <路径>` 指定位置。确认 VSIX 中的身份、版本和语言资源正确，安装后用 `examples/` 验证高亮、括号和折叠行为。

## 发布

同步 `package.json` 的版本与 `CHANGELOG.md` 的版本标题。使用具有该 publisher 发布权限的身份，将已验证的 VSIX 通过 `pnpm exec vsce publish --packagePath <VSIX 路径>` 发布，并确认 Marketplace 上的版本。

认证方式参考 [VS Code 发布文档](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)。
