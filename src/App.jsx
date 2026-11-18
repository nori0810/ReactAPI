
import { useState } from "react";
import "./style.css";

function App() {
  const [page, setPage] = useState("list");

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // 商品追加
  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name,
      description,
      price: Number(price),
      image
    };

    setProducts([...products, newProduct]);

    setName("");
    setDescription("");
    setPrice("");
    setImage("");

    setPage("list");
  };

  // 商品削除
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="app">

      <header>
        <h1>LAMINA</h1>
      </header>

      <p className="subtitle">オンラインショップ</p>

      {page === "list" ? (

        // 商品一覧画面
        <main>
          <div className="products-header">
            <h2>商品一覧</h2>

            <button onClick={() => setPage("add")}>
              ＋ 追加
            </button>
          </div>

          <div className="product-list">

            {products.length === 0 ? (
              <p>商品がありません。</p>
            ) : (
              products.map((product) => (
                <div className="product-card" key={product.id}>

                  <img src={product.image} alt={product.name} />

                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

                  <p>¥{product.price.toLocaleString()}</p>

                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    削除
                  </button>

                </div>
              ))
            )}

          </div>
        </main>

      ) : (

        // 商品追加画面
        <main>
          <h2>新しい商品を登録</h2>

          <form onSubmit={handleAddProduct}>

            <label>商品名</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="パーカー"
              required
            />

            <label>商品説明</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="着心地の良いパーカーです。"
              required
            />

            <label>価格</label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="2999"
              required
            />

            <label>画像URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
            />

            <button type="submit">
              ＋ 商品を追加
            </button>

          </form>

          <button onClick={() => setPage("list")}>
            戻る
          </button>
        </main>

      )}

    </div>
  );
}

export default App;
