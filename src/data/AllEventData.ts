export interface SportsType {
  sport: string;
  minPlayers: number;
  substitute: number | "NA";
  entryFee: number;
  maxEntry: number | "Open";
  qrImage:string
  watsapp:string
}
export const sportsData: SportsType[] = [
  {
    sport: "Football",
    minPlayers: 9,
    substitute: 16,
    entryFee: 1600,
    maxEntry: 20,
    qrImage:'/football.jpeg',
    watsapp:"https://chat.whatsapp.com/EiIaWdUpIkBI3KGBVub6HZ"
  },
  {
    sport: "Basketball (Boys)",
    minPlayers: 5,
    substitute: 12,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg',
     watsapp:"https://chat.whatsapp.com/BooS1lIf9b5DSJeDIskL4P"
  },
  {
    sport: "Basketball (Girls)",
    minPlayers: 5,
    substitute: 12,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg',
     watsapp:"https://chat.whatsapp.com/BooS1lIf9b5DSJeDIskL4P"
  },
  {
    sport: "Volleyball (Boys)",
    minPlayers: 6,
    substitute: 12,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg',
     watsapp:"https://chat.whatsapp.com/JWgQHCz4oKvFcRIYpQzi1Z"
  },
  {
    sport: "Volleyball (Girls)",
    minPlayers: 6,
    substitute: 12,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg',
     watsapp:"https://chat.whatsapp.com/JWgQHCz4oKvFcRIYpQzi1Z"
  },
  {
    sport: "Badminton Singles (Boy)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg',
     watsapp:"https://chat.whatsapp.com/BifMUpY8Kcq9ZS6gZRDOVb"
  },
  {
    sport: "Badminton Singles (Girl)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg',
     watsapp:"https://chat.whatsapp.com/BifMUpY8Kcq9ZS6gZRDOVb"
  },
  {
    sport: "Badminton Doubles (Boy)",
    minPlayers: 2,
    substitute: "NA",
    entryFee: 300,
    maxEntry: "Open",
     qrImage:'/badmintondouble.jpeg',
     watsapp:"https://chat.whatsapp.com/BifMUpY8Kcq9ZS6gZRDOVb"
  },
  {
    sport: "Badminton Doubles (Girl)",
    minPlayers: 2,
    substitute: "NA",
    entryFee: 300,
    maxEntry: "Open",
     qrImage:'/badmintondouble.jpeg',
     watsapp:"https://chat.whatsapp.com/BifMUpY8Kcq9ZS6gZRDOVb"
  },
  {
    sport: "Badminton Doubles (Mix)",
    minPlayers: 2,
    substitute: "NA",
    entryFee: 300,
    maxEntry: "Open",
     qrImage:'/badmintondouble.jpeg',
     watsapp:"https://chat.whatsapp.com/BifMUpY8Kcq9ZS6gZRDOVb"
  },
  {
    sport: "Table Tennis Singles (Boy)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg',
     watsapp:"https://chat.whatsapp.com/KmQvkfZ6jw48CIx6GgTXc0"
  },
  {
    sport: "Table Tennis Singles (Girl)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg',
     watsapp:"https://chat.whatsapp.com/KmQvkfZ6jw48CIx6GgTXc0"
  },
  {
    sport: "Table Tennis Doubles (Boy)",
    minPlayers: 2,
    substitute: "NA",
    entryFee: 300,
    maxEntry: "Open",
     qrImage:'/badmintondouble.jpeg',
     watsapp:"https://chat.whatsapp.com/KmQvkfZ6jw48CIx6GgTXc0"
  },
  {
    sport: "Table Tennis Doubles (Girl)",
    minPlayers: 2,
    substitute: "NA",
    entryFee: 300,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg',
     watsapp:"https://chat.whatsapp.com/KmQvkfZ6jw48CIx6GgTXc0"
  },
  {
    sport: "Table Tennis Doubles (Mix)",
    minPlayers: 2,
    substitute: "NA",
    entryFee: 300,
    maxEntry: "Open",
     qrImage:'/badmintondouble.jpeg',
     watsapp:"https://chat.whatsapp.com/KmQvkfZ6jw48CIx6GgTXc0"
  },
  {
    sport: "Tug of war (Boys)",
    minPlayers: 8,
    substitute: 10,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg',
     watsapp:"https://chat.whatsapp.com/EYtWvL46iWR63oBt9AclTz"
  },
  {
    sport: "Tug of war (Girls)",
    minPlayers: 8,
    substitute: 10,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg',
     watsapp:"https://chat.whatsapp.com/EYtWvL46iWR63oBt9AclTz"
  },
  {
    sport: "Chess",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: 12,
     qrImage:'/badminton.jpeg',
     watsapp:"https://chat.whatsapp.com/Cl9wgoi82GqAB0LGBFPEPi"
  },
  {
    sport: "Kabaddi (Boys)",
    minPlayers: 7,
    substitute: 12,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg',
     watsapp:"https://chat.whatsapp.com/LouTxDo98jDJI9RNP2QYOI"
  },
  {
    sport: "Kabaddi (Girls)",
    minPlayers: 7,
    substitute: 12,
    entryFee: 1200,
    maxEntry: 20,
     qrImage:'/basketball.jpeg',
     watsapp:"https://chat.whatsapp.com/LouTxDo98jDJI9RNP2QYOI"
  },
  {
    sport: "Arm Wrestling Featherweight ( <65 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 100,
    maxEntry: "Open",
     qrImage:'/arm.jpeg',
     watsapp:"https://chat.whatsapp.com/EPVHHMmnCc3BG2ygPFvC7D"
  },
  {
    sport: "Arm Wrestling  Lightweight (65 - 75 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 100,
    maxEntry: "Open",
     qrImage:'/arm.jpeg',
     watsapp:"https://chat.whatsapp.com/EPVHHMmnCc3BG2ygPFvC7D"
  },
  {
    sport: "Arm Wrestling Middleweight (75 - 85 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 100,
    maxEntry: "Open",
     qrImage:'/arm.jpeg',
     watsapp:"https://chat.whatsapp.com/EPVHHMmnCc3BG2ygPFvC7D"
  },
  {
    sport: "Arm Wrestling Heavyweight (85 - 100 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 100,
    maxEntry: "Open",
     qrImage:'/arm.jpeg',
     watsapp:"https://chat.whatsapp.com/EPVHHMmnCc3BG2ygPFvC7D"
  },
  {
    sport: "Body Building Lightweight (65 - 75 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg',
     watsapp:"https://chat.whatsapp.com/ISqqAil1BKSKHpnv8HUgYi"
  },
  {
    sport: "Body Building Middleweight (65 - 75 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg',
     watsapp:"https://chat.whatsapp.com/ISqqAil1BKSKHpnv8HUgYi"
  },
  {
    sport: "Body Building Heavyweight (75 - 85 Kg)",
    minPlayers: 1,
    substitute: "NA",
    entryFee: 150,
    maxEntry: "Open",
     qrImage:'/badminton.jpeg',
     watsapp:"https://chat.whatsapp.com/ISqqAil1BKSKHpnv8HUgYi"
  },
  
];
				