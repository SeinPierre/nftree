start:
	HOST=localhost;npm start --prefix=react-client

build-wasm:
	cd wasm && wasm-pack build --out-dir ../wasm-build --target web