import { dbConfig } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

await dbConfig();

const medicines = [
  {
    name: "Oxycodone",
    photoUrl: "/product/medicine.jpg",
    stock: "98",
    type: "Tablet",
    description:
      "Opioid pain medication used to treat moderate to severe pain.",
    company_name: "PainMeds",
    amount_per_strip: 10,
    variants: [
      { mg: "5mg", regular_price: 80, discounted_price: 75 },
      { mg: "10mg", regular_price: 90, discounted_price: 85 },
      { mg: "15mg", regular_price: 100, discounted_price: 95 },
    ],
    category: "Opioids",
  },
  {
    name: "Fentanyl",
    photoUrl: "/product/medicine.jpg",
    stock: "98",
    type: "Tablet",
    description: "Opioid used to treat severe pain, especially after surgery.",
    company_name: "StrongPainRelief",
    amount_per_strip: 10,
    variants: [
      { mg: "50mcg", regular_price: 85, discounted_price: 80 },
      { mg: "100mcg", regular_price: 95, discounted_price: 90 },
      { mg: "200mcg", regular_price: 105, discounted_price: 100 },
    ],
    category: "Opioids",
  },
  {
    name: "Cetirizine",
    photoUrl: "/product/medicine.jpg",
    stock: "98",
    type: "Tablet",
    description: "Antihistamine used to relieve allergy symptoms.",
    company_name: "AllergyRelief Ltd.",
    amount_per_strip: 10,
    variants: [
      { mg: "5mg", regular_price: 40, discounted_price: 35 },
      { mg: "10mg", regular_price: 50, discounted_price: 45 },
      { mg: "20mg", regular_price: 60, discounted_price: 55 },
    ],
    category: "Antihistamines",
  },
  {
    name: "Loratadine",
    photoUrl: "/product/medicine.jpg",
    stock: "98",
    type: "Tablet",
    description: "Antihistamine used to treat allergy symptoms.",
    company_name: "AllergyMeds",
    amount_per_strip: 10,
    variants: [
      { mg: "5mg", regular_price: 35, discounted_price: 30 },
      { mg: "10mg", regular_price: 45, discounted_price: 40 },
      { mg: "20mg", regular_price: 55, discounted_price: 50 },
    ],
    category: "Antihistamines",
  },
  {
    name: "Fexofenadine",
    photoUrl: "/product/medicine.jpg",
    stock: "98",
    type: "Tablet",
    description: "Antihistamine used to relieve allergy symptoms.",
    company_name: "HistamineBlock",
    amount_per_strip: 10,
    variants: [
      { mg: "30mg", regular_price: 45, discounted_price: 40 },
      { mg: "60mg", regular_price: 55, discounted_price: 50 },
      { mg: "120mg", regular_price: 65, discounted_price: 60 },
    ],
    category: "Antihistamines",
  },
  {
    name: "Pseudoephedrine",
    photoUrl: "/product/medicine.jpg",
    stock: "98",
    type: "Tablet",
    description: "Decongestant used to relieve nasal congestion.",
    company_name: "NasalClear",
    amount_per_strip: 10,
    variants: [
      { mg: "30mg", regular_price: 25, discounted_price: 20 },
      { mg: "60mg", regular_price: 35, discounted_price: 30 },
      { mg: "120mg", regular_price: 45, discounted_price: 40 },
    ],
    category: "Decongestants",
  },
  {
    name: "Phenylephrine",
    photoUrl: "/product/medicine.jpg",
    stock: "98",
    type: "Tablet",
    description: "Decongestant used to relieve nasal and sinus congestion.",
    company_name: "ClearSinus",
    amount_per_strip: 10,
    variants: [
      { mg: "5mg", regular_price: 20, discounted_price: 18 },
      { mg: "10mg", regular_price: 25, discounted_price: 22 },
      { mg: "20mg", regular_price: 30, discounted_price: 27 },
    ],
    category: "Decongestants",
  },
  {
    name: "Oxymetazoline",
    photoUrl: "/product/medicine.jpg",
    stock: "98",
    type: "Nasal Spray",
    description: "Decongestant used to relieve nasal congestion.",
    company_name: "NasalRelief",
    amount_per_strip: 1,
    variants: [
      { mg: "0.05%", regular_price: 15, discounted_price: 12 },
      { mg: "0.1%", regular_price: 20, discounted_price: 18 },
    ],
    category: "Decongestants",
  },
  {
    name: "Guaifenesin",
    photoUrl: "/product/medicine.jpg",
    stock: "98",
    type: "Syrup",
    description: "Expectorant used to relieve chest congestion.",
    company_name: "ColdFluPharma",
    amount_per_strip: 1,
    variants: [
      { mg: "100ml", regular_price: 30, discounted_price: 25 },
      { mg: "200ml", regular_price: 40, discounted_price: 35 },
      { mg: "500ml", regular_price: 50, discounted_price: 45 },
    ],
    category: "Cold & Flu",
  },
  {
    name: "Dextromethorphan",
    photoUrl: "/product/medicine.jpg",
    stock: "98",
    type: "Syrup",
    description: "Cough suppressant used to relieve cough.",
    company_name: "CoughRelief",
    amount_per_strip: 1,
    variants: [
      { mg: "100ml", regular_price: 35, discounted_price: 30 },
      { mg: "200ml", regular_price: 45, discounted_price: 40 },
      { mg: "500ml", regular_price: 55, discounted_price: 50 },
    ],
    category: "Cold & Flu",
  },
  {
    name: "Phenylephrine",
    photoUrl: "/product/medicine.jpg",
    stock: "98",
    type: "Tablet",
    description: "Decongestant used to relieve nasal and sinus congestion.",
    company_name: "ClearSinus",
    amount_per_strip: 10,
    variants: [
      { mg: "5mg", regular_price: 20, discounted_price: 18 },
      { mg: "10mg", regular_price: 25, discounted_price: 22 },
      { mg: "20mg", regular_price: 30, discounted_price: 27 },
    ],
    category: "Cold & Flu",
  },
];

export const POST = async (req) => {
  for (let i = 0; i < medicines.length; i++) {
    await new Product(medicines[i]).save();
  }
  return NextResponse.json(true);
};
