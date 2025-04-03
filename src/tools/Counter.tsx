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

import {useEffect, useRef, useState} from "react";
import {Button, FormControl, IconButton, Input, InputLabel} from "@mui/material";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";

const Counter = () => {
    const [count, setCount] = useState(0);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100);
    const [showSettings, setShowSettings] = useState(false);
    const canvas = useRef<HTMLCanvasElement>(null);
    const [mode, setMode] = useState<"up" | "down">("up");

    const reset = () => setCount(mode == "up" ? min : max);

    useEffect(
        () => {
            reset();
        },
        [mode]
    )

    const Settings = () => {
        if (showSettings) {
            return (
                <>
                    <FormControl>
                        <InputLabel htmlFor="setting-minimum"> 最小値: </InputLabel>
                        <Input type="number" onChange={
                            (e) => setMin(Number.parseInt(e.target.value))
                        } defaultValue={0} id="setting-minimum" inputProps={{
                            min: -2000000,
                            max: 0
                        }} value={min}/>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="setting-maximum"> 最大値: </InputLabel>
                        <Input type="number" onChange={
                            (e) => setMax(Number.parseInt(e.target.value))
                        } defaultValue={0} id="setting-maximum" inputProps={{
                            min: 0,
                            max: 2000000
                        }} value={max}/>
                    </FormControl>
                    <FormControl>
                        <IconButton onClick={() => {
                            setMode(prevState => prevState == "up" ? "down" : "up");
                        }}>
                            {(mode == "up" ?
                                    <ArrowUpward/> :
                                    <ArrowDownward/>
                            )}
                        </IconButton>
                    </FormControl>
                </>
            );
        }
        return (
            <></>
        );
    }

    useEffect(() => {
        if (canvas && canvas.current) {
            const ctx = canvas.current.getContext("2d");
            if (ctx) {
                const width = canvas.current.width;
                const height = canvas.current.height;
                // 画面の初期化
                ctx.clearRect(0, 0, width, height);
                // 背景の設定
                ctx.fillStyle = "#bf7fff";
                ctx.fillRect(0, 0, width, height);
                // 文字サイズ及びキャンバスのサイズから描画開始座標を求める。
                ctx.font = "50px serif";
                ctx.fillStyle = "#fff";
                const fontSize = ctx.measureText(count.toString());
                const pos: { x: number, y: number } = {
                    x: (width - fontSize.width) / 2,
                    y: (height + fontSize.fontBoundingBoxAscent) / 2
                };
                ctx.fillText(count.toString(), pos.x, pos.y);
            }
        }
    }, [canvas, count])

    return (
        <>
            <div className="flex flex-row justify-center">
                <Settings/>
                <FormControl>
                    <Button type="button" variant="contained" onClick={() => {
                        setShowSettings(prevState => !prevState)
                    }}> {showSettings ? "閉じる" : "設定"} </Button>
                </FormControl>
                <FormControl>
                    <Button onClick={reset}>
                        リセット
                    </Button>
                </FormControl>
                <canvas width="300" height="300" ref={canvas} onClick={() => {
                    setCount(prevState => {
                        if (mode == "up")
                            return (prevState + 1 <= max) ? prevState + 1 : min;
                        else
                            return prevState - 1 >= min ? prevState - 1 : min;
                    })
                }}/>
            </div>
        </>
    );
}

export default Counter;