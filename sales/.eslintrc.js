module.exports = {
  "plugins": [
    "react"  // eslint-plugin-react
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint"
};