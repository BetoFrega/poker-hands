"use client";
import { CardsSelector } from "../components/CardsSelector/CardsSelector";

export default function Home() {
  return (
    <CardsSelector selectedCards={[]} onSelect={(card) => console.log(card)} />
  );
}
