# FtBackdrop

A backdrop component for Angular, inspired by [Material Design](https://material.io/components/backdrop).

**Note**: Was previously used as a shared component before being moved to its own library. Some styles (i.e. CSS variables defining colours) can be safely overriden and will be removed in later iterations.

## Build

Dependencies:

- Angular
- RxJS
- NgRx Store

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Install

`yarn add /PATH_TO_FOLDER/dist/backdrop/`

## Usage

```html
<!-- Back layer content -->

<ft-backdrop>
  <!-- Front layer content -->
</ft-backdrop>
```

_For the best results, the backdrop should be styled to, or fit in a container, that fills to the bottom of the screen._
