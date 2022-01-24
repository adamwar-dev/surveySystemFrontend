import * as React from "react";

export const ColoredLine = (color: string) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
);