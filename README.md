# ml_prov

 ![npm (scoped)](https://img.shields.io/npm/v/@keckelt/ml-prov?style=flat)
![Github Actions Status](https://github.com/Vis4Sense/ml-prov-binder/workflows/Build/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/Vis4Sense/ml-prov-binder/demo?urlpath=lab)

JupyterLab extension for visual hyperparamter tuning.

:rocket: Try it out on Binder: [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/Vis4Sense/ml-prov-binder/demo?urlpath=lab)

This extension is composed of a Python package named `ml_prov` for the server extension
and a NPM package named `ml-prov` for the frontend extension.

This extension was created with the [TypeScript cookiecutter](https://github.com/jupyterlab/extension-cookiecutter-ts) based on the official [extension tutorial](https://jupyterlab.readthedocs.io/en/stable/extension/extension_tutorial.html#extension-tutorial).

## Requirements

* JupyterLab >= 3.0

You can also use the [environment.yml](https://github.com/Vis4Sense/ml-prov-binder/blob/demo/environment.yml) file with conda. The `nbclassic` version is pinned there due to [version conflicts](https://github.com/jupyterlab/jupyterlab/issues/10228).

## Install

Install [JupyterLab](http://jupyterlab.readthedocs.io/en/latest/getting_started/installation.html) if you haven't already.

To install the extension, execute:
🟥 not yet available, please refer to the _Development Install_ section below.

```bash
pip install ml_prov
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall ml_prov
```

## Troubleshoot

If you are seeing the frontend extension, but it is not working, check
that the server extension is enabled:

```bash
jupyter server extension list
```

If the server extension is installed and enabled, but you are not seeing
the frontend extension, check the frontend extension is installed:

```bash
jupyter labextension list
```

## Contributing

### Development install

Note: You will need [NodeJS](https://nodejs.org/en/) to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the ml_prov directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Server extension must be manually installed in develop mode
jupyter server extension enable ml_prov
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
# Server extension must be manually disabled in develop mode
jupyter server extension disable ml_prov
pip uninstall ml_prov
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `ml-prov` within that folder.

### Publish

1. Make code changes
2. Update version in package.json
3. Make sure to `npm login`
4. Build the extension: `jlpm run build:prod`
5. Verify files to be published `npm pack --dry-run`
6. Publish `npm publish`
