const DIAMOND = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "raw_diamond_id",
				"type": "uint256"
			},
			{
				"internalType": "enum Diamond.Shape",
				"name": "shape",
				"type": "uint8"
			}
		],
		"name": "cutting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "cutting_company",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "company",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "cutting_company_registry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_cutting_company",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "cutting_company_address",
				"type": "address"
			}
		],
		"name": "get_cutting_company_name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "unique_id",
				"type": "uint256"
			}
		],
		"name": "get_diamond",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "diamond_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "graded_company",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "raw_diamond_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "raw_cutting_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "company_name",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "raw_diamond_id",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "raw_cutting_diamond_id",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "cutted_company",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "company_name",
								"type": "string"
							},
							{
								"internalType": "enum Diamond.Shape",
								"name": "shape",
								"type": "uint8"
							},
							{
								"components": [
									{
										"internalType": "uint256",
										"name": "raw_diamond_id",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "timestamp",
										"type": "uint256"
									},
									{
										"internalType": "address",
										"name": "mined_company",
										"type": "address"
									},
									{
										"internalType": "string",
										"name": "company_name",
										"type": "string"
									},
									{
										"internalType": "enum Diamond.Source",
										"name": "source",
										"type": "uint8"
									}
								],
								"internalType": "struct Diamond.raw_diamond",
								"name": "raw_diamond_information",
								"type": "tuple"
							}
						],
						"internalType": "struct Diamond.raw_cutting_diamond",
						"name": "raw_cutting_information",
						"type": "tuple"
					},
					{
						"internalType": "enum Diamond.Clarity",
						"name": "clarity",
						"type": "uint8"
					},
					{
						"internalType": "enum Diamond.Colour",
						"name": "colour",
						"type": "uint8"
					},
					{
						"internalType": "enum Diamond.Cut",
						"name": "cut",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "carat",
						"type": "uint256"
					}
				],
				"internalType": "struct Diamond.diamond",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_grading_company",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "grading_company_address",
				"type": "address"
			}
		],
		"name": "get_grading_company_name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_mining_company",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "mining_company_address",
				"type": "address"
			}
		],
		"name": "get_mining_company_name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "raw_id",
				"type": "uint256"
			}
		],
		"name": "get_raw_cutting_diamond",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "raw_diamond_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "raw_cutting_diamond_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "cutted_company",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "company_name",
						"type": "string"
					},
					{
						"internalType": "enum Diamond.Shape",
						"name": "shape",
						"type": "uint8"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "raw_diamond_id",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "mined_company",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "company_name",
								"type": "string"
							},
							{
								"internalType": "enum Diamond.Source",
								"name": "source",
								"type": "uint8"
							}
						],
						"internalType": "struct Diamond.raw_diamond",
						"name": "raw_diamond_information",
						"type": "tuple"
					}
				],
				"internalType": "struct Diamond.raw_cutting_diamond",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "raw_id",
				"type": "uint256"
			}
		],
		"name": "get_raw_diamond",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "raw_diamond_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "mined_company",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "company_name",
						"type": "string"
					},
					{
						"internalType": "enum Diamond.Source",
						"name": "source",
						"type": "uint8"
					}
				],
				"internalType": "struct Diamond.raw_diamond",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "raw_cutting_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "carat",
				"type": "uint256"
			},
			{
				"internalType": "enum Diamond.Clarity",
				"name": "clarity",
				"type": "uint8"
			},
			{
				"internalType": "enum Diamond.Colour",
				"name": "colour",
				"type": "uint8"
			},
			{
				"internalType": "enum Diamond.Cut",
				"name": "cut",
				"type": "uint8"
			}
		],
		"name": "grading",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "grading_company",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "company",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "grading_company_registry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Diamond.Source",
				"name": "source",
				"type": "uint8"
			}
		],
		"name": "mining",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mining_company",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "company",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "mining_company_registry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "raw_cutting_supply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "raw_total_supply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "total_supply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const JEWELARY = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "unique_id",
				"type": "uint256"
			}
		],
		"name": "buy_jewelary_from_manufacturer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "diamond",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "get_approve",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "holder",
				"type": "address"
			}
		],
		"name": "get_holds_jewelary",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "get_jewelary",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "unique_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "diamond_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "enum Jewelary.Jewelary_type",
						"name": "jewelary_type",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "photo",
						"type": "string"
					}
				],
				"internalType": "struct Jewelary.jewelary",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "diamond_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "enum Jewelary.Jewelary_type",
				"name": "jewelary_type",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "photo",
				"type": "string"
			}
		],
		"name": "manufactur_jewelary",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "unique_id",
				"type": "uint256"
			}
		],
		"name": "sell_jewelary_to_manufacturer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "holder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "set_holder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "set_price",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transfer_from",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

module.exports={DIAMOND, JEWELARY}