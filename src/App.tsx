/*
 * MIT License
 *
 * Copyright (c) saku shirakura <saku@sakushira.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Counter from "./tools/Counter.tsx";

const Index = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full text-center">
            <p>カウンター:<Link to="/tools/counter">こちら</Link></p>
        </div>
    );
}

const App = () => {
    return (
        <>
            <header>
                <div>

                </div>
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Index/>}/>
                    <Route path="/tools/counter" element={<Counter/>}/>
                </Routes>
            </BrowserRouter>
            <footer>
                <div>
                    <p>このwebアプリケーションではいくつかのオープンソースソフトウェアを使用しています。</p>
                    <p>詳細は<a href="https://github.com/saku-shirakura/web-tool.ln3.net">Github リポジトリ</a>を確認してください。</p>
                    <p>（リポジトリを確認する方法によるライセンス表示は仮のものです。ライセンスページは追加を予定しています。）</p>
                </div>
            </footer>
        </>
    );
}

export default App;