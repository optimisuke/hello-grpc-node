# hello-grpc-node

下記サイトを参考に grpc x node.js を動作確認した。

[OK Google, Protocol Buffers から生成したコードを使って Node.js で gRPC 通信して | メルカリエンジニアリング](https://engineering.mercari.com/blog/entry/20201216-53796c2494/)

- `confg.ts`が抜けていたので、追加した。
- `GreeterClient`の options である`grpcClientOptions`に何を入れるべきかわからなかったので、削除して確認した。
- コンテナを分けて試してみた。

# TODO

- `package.json`をもうちょい綺麗にする
