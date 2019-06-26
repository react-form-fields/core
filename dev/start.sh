(cd ../lib && yarn unlink)
(cd ../lib && yarn link)
(cd ../lib/node_modules/react && yarn unlink)
(cd ../lib/node_modules/react && yarn link)

yarn
yarn react-scripts start