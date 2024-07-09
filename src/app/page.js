import DisplayPage from "@/components/DisplayPage/DisplayPage";
import Sidebar from "@/components/Sidebar/Sidebar";
import { dbConfig } from "@/dbConfig/dbConfig";
import Category from "@/models/categoryModel";
import HomePage from "@/pages/HomePage";
import React from "react";

await dbConfig();

const page = async () => {
  const categories = await Category.find();
  const medicines = [
    {
      name: "Aspirin",
      photoUrl: "/medicine/medicine.jpg",
      type: "Tablet",
      description: "Used to reduce pain, fever, or inflammation.",
      company_name: "PharmaCorp",
      amount_per_strip: 10,
      variants: [
        { mg: "40mg", regular_price: 50, discounted_price: 45 },
        { mg: "50mg", regular_price: 60, discounted_price: 55 },
        { mg: "100mg", regular_price: 70, discounted_price: 65 },
      ],
      category: "Analgesics",
    },
    {
      name: "Ibuprofen",
      photoUrl: "/medicine/medicine.jpg",
      type: "Tablet",
      description:
        "Nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation.",
      company_name: "PainAway Pharmaceuticals",
      amount_per_strip: 10,
      variants: [
        { mg: "200mg", regular_price: 45, discounted_price: 40 },
        { mg: "400mg", regular_price: 55, discounted_price: 50 },
        { mg: "800mg", regular_price: 65, discounted_price: 60 },
      ],
      category: "Analgesics",
    },
    {
      name: "Acetaminophen",
      photoUrl: "/medicine/medicine.jpg",
      type: "Tablet",
      description: "Used to relieve pain and reduce fever.",
      company_name: "HealthMeds",
      amount_per_strip: 10,
      variants: [
        { mg: "500mg", regular_price: 30, discounted_price: 25 },
        { mg: "650mg", regular_price: 40, discounted_price: 35 },
        { mg: "1000mg", regular_price: 50, discounted_price: 45 },
      ],
      category: "Analgesics",
    },
    {
      name: "Naproxen",
      photoUrl: "/medicine/medicine.jpg",
      type: "Tablet",
      description:
        "Nonsteroidal anti-inflammatory drug (NSAID) used to treat pain or inflammation.",
      company_name: "ReliefMeds",
      amount_per_strip: 10,
      variants: [
        { mg: "250mg", regular_price: 60, discounted_price: 55 },
        { mg: "500mg", regular_price: 70, discounted_price: 65 },
        { mg: "750mg", regular_price: 80, discounted_price: 75 },
      ],
      category: "Anti-inflammatory",
    },
    {
      name: "Diclofenac",
      photoUrl: "/medicine/medicine.jpg",
      type: "Tablet",
      description: "NSAID used to treat pain and inflammatory disorders.",
      company_name: "InflammationCare",
      amount_per_strip: 10,
      variants: [
        { mg: "50mg", regular_price: 40, discounted_price: 35 },
        { mg: "75mg", regular_price: 50, discounted_price: 45 },
        { mg: "100mg", regular_price: 60, discounted_price: 55 },
      ],
      category: "Anti-inflammatory",
    },
    {
      name: "Meloxicam",
      photoUrl: "/medicine/medicine.jpg",
      type: "Tablet",
      description: "Used to treat arthritis by reducing inflammation and pain.",
      company_name: "JointRelief",
      amount_per_strip: 10,
      variants: [
        { mg: "7.5mg", regular_price: 55, discounted_price: 50 },
        { mg: "15mg", regular_price: 65, discounted_price: 60 },
        { mg: "30mg", regular_price: 75, discounted_price: 70 },
      ],
      category: "Anti-inflammatory",
    },
    {
      name: "Morphine",
      photoUrl: "/medicine/medicine.jpg",
      type: "Tablet",
      description: "Opioid used to treat severe pain.",
      company_name: "OpioidPharma",
      amount_per_strip: 10,
      variants: [
        { mg: "10mg", regular_price: 75, discounted_price: 70 },
        { mg: "20mg", regular_price: 85, discounted_price: 80 },
        { mg: "30mg", regular_price: 95, discounted_price: 90 },
      ],
      category: "Opioids",
    },
    {
      name: "Oxycodone",
      photoUrl: "/medicine/medicine.jpg",
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
      photoUrl: "/medicine/medicine.jpg",
      type: "Tablet",
      description:
        "Opioid used to treat severe pain, especially after surgery.",
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
      photoUrl: "/medicine/medicine.jpg",
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
      photoUrl: "/medicine/medicine.jpg",
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
      photoUrl: "/medicine/medicine.jpg",
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
      photoUrl: "/medicine/medicine.jpg",
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
      photoUrl: "/medicine/medicine.jpg",
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
      photoUrl: "/medicine/medicine.jpg",
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
      photoUrl: "/medicine/medicine.jpg",
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
      photoUrl: "/medicine/medicine.jpg",
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
      photoUrl: "/medicine/medicine.jpg",
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

  return <HomePage categories={categories} medicines={medicines} />;
};

export default page;
