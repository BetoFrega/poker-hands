import React from "react";

export enum Winner {
  TIE,
  Player1,
  Player2,
}

export function WinnerDisplay(props: { winner: false | Winner }) {
  return (
    <>
      {props.winner !== false && (
        <div aria-label="Hand comparison result">
          {props.winner === Winner.TIE
            ? "It's a tie!"
            : `Player ${props.winner} wins!`}
        </div>
      )}
    </>
  );
}
