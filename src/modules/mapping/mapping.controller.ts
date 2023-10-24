import { Controller, Post, Get, Body, Query, Inject } from '@nestjs/common';

import { MappingService } from './mapping.service';

import { ApiSchemaDTO } from './dto/api-schema.dto';

const standard = {
  title: 'HSF-API-57-RETURN-10',
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      default: true,
    },
    time: {
      type: 'number',
    },
    data: {
      title: 'HotelDetailResponseData',
      type: 'object',
      properties: {
        hotelId: {
          type: 'string',
          description: '酒店ID',
        },
        hotelName: {
          type: 'string',
          description: '酒店名称',
        },
        hotelNameTranslated: {
          type: 'string',
          description: '酒店名称翻译',
        },
        countryId: {
          type: 'string',
          description: '外部(供应商)国家ID',
        },
        country: {
          title: 'FeedPropertyDO',
          description: '属性字典',
          type: 'object',
          properties: {
            domain: {
              type: 'string',
              enum: [
                'CURRENCY',
                'LANGUAGE',
                'HOTEL_CHAIN',
                'HOTEL_BRAND',
                'HOTEL_FACILITY',
                'ROOM_FACILITY',
                'COUNTRY',
                'CITY',
              ],
              'x-xapi-enumDescriptions': {
                CURRENCY: '',
                LANGUAGE: '',
                HOTEL_CHAIN: '',
                HOTEL_BRAND: '',
                HOTEL_FACILITY: '',
                ROOM_FACILITY: '',
                COUNTRY: '',
                CITY: '',
              },
            },
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            names: {
              type: 'string',
            },
            env: {
              type: 'string',
            },
            properties: {
              type: 'array',
              items: {
                title: 'PropertyItemDO',
                type: 'object',
                properties: {
                  key: {
                    type: 'string',
                  },
                  value: {
                    type: 'string',
                  },
                },
              },
            },
            requestPk: {
              type: 'string',
            },
            vendorCode: {
              type: 'string',
            },
            vendorType: {
              type: 'string',
            },
            data: {
              type: 'string',
              description: '原始数据',
            },
            time: {
              type: 'number',
              description: '数据时间',
            },
            language: {
              type: 'string',
              description: '语言',
            },
          },
          required: ['domain', 'id', 'properties', 'requestPk', 'vendorCode'],
        },
        cityId: {
          type: 'string',
          description: '外部(供应商)城市ID',
        },
        city: {
          title: 'FeedPropertyDO',
          description: '属性字典',
          type: 'object',
          properties: {
            domain: {
              type: 'string',
              enum: [
                'CURRENCY',
                'LANGUAGE',
                'HOTEL_CHAIN',
                'HOTEL_BRAND',
                'HOTEL_FACILITY',
                'ROOM_FACILITY',
                'COUNTRY',
                'CITY',
              ],
              'x-xapi-enumDescriptions': {
                CURRENCY: '',
                LANGUAGE: '',
                HOTEL_CHAIN: '',
                HOTEL_BRAND: '',
                HOTEL_FACILITY: '',
                ROOM_FACILITY: '',
                COUNTRY: '',
                CITY: '',
              },
            },
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            names: {
              type: 'string',
            },
            env: {
              type: 'string',
            },
            properties: {
              type: 'array',
              items: {
                title: 'PropertyItemDO',
                type: 'object',
                properties: {
                  key: {
                    type: 'string',
                  },
                  value: {
                    type: 'string',
                  },
                },
              },
            },
            requestPk: {
              type: 'string',
            },
            vendorCode: {
              type: 'string',
            },
            vendorType: {
              type: 'string',
            },
            data: {
              type: 'string',
              description: '原始数据',
            },
            time: {
              type: 'number',
              description: '数据时间',
            },
            language: {
              type: 'string',
              description: '语言',
            },
          },
          required: ['domain', 'id', 'properties', 'requestPk', 'vendorCode'],
        },
        tel: {
          title: 'PhoneDO',
          description: '静态信息-电话',
          type: 'object',
          properties: {
            countryCode: {
              type: 'string',
              description: '国家代码',
            },
            areaCode: {
              type: 'string',
              description: '区域代码',
            },
            number: {
              type: 'string',
              description: '电话',
            },
          },
          required: ['number'],
        },
        longitude: {
          type: 'string',
          description: '经度',
        },
        latitude: {
          type: 'string',
          description: '维度',
        },
        positionType: {
          type: 'string',
          description: 'Google:谷歌地图;GaoDe:高德',
          enum: ['Google', 'GaoDe'],
          'x-xapi-enumDescriptions': {
            Google: '',
            GaoDe: '',
          },
        },
        rating: {
          type: 'string',
          description: '酒店评分',
        },
        star: {
          type: 'string',
          description: '星级',
        },
        popularityScore: {
          type: 'integer',
          description: '酒店热度值',
          format: 'int32',
        },
        description: {
          type: 'string',
          description: '酒店描述',
        },
        descriptionTranslated: {
          type: 'string',
          description: '酒店描述翻译',
        },
        childAndExtraBedPolicy: {
          title: 'FeedChildAndExtraBedPolicyDO',
          description: '儿童和加床政策',
          type: 'object',
          properties: {
            infantAge: {
              type: 'string',
              description: '婴儿年龄',
            },
            childrenAgeFrom: {
              type: 'string',
              description: '儿童年龄-起',
            },
            childrenAgeTo: {
              type: 'string',
              description: '儿童年龄-结束',
            },
            childrenStayFree: {
              type: 'string',
              description: '儿童免费入住年龄',
            },
            minGuestAge: {
              type: 'string',
              description: '最小客人年龄',
            },
          },
        },
        minimumGuestAge: {
          type: 'string',
          description: '最小入住年龄',
        },
        checkInTime: {
          type: 'string',
          description: 'checkInTime',
        },
        checkOutTime: {
          type: 'string',
          description: 'checkOutTime',
        },
        remark: {
          type: 'string',
          description: '酒店提醒',
        },
        remarkTranslated: {
          type: 'string',
          description: '酒店提醒翻译',
        },
        addresses: {
          type: 'array',
          description: '酒店地址',
          items: {
            title: 'FeedAddressDO',
            description: '酒店地址',
            type: 'object',
            properties: {
              addressLine: {
                type: 'string',
                description: '详细地址',
              },
              city: {
                type: 'string',
                description: '城市',
              },
              country: {
                type: 'string',
                description: '国家',
              },
              addressType: {
                type: 'string',
                description: '语言类型',
                enum: ['ZH_CN', 'EN_US', 'LOCAL'],
                'x-xapi-enumDescriptions': {
                  ZH_CN: '',
                  EN_US: '',
                  LOCAL: '',
                },
              },
              extend: {
                type: 'object',
                description: '扩展字段',
                properties: {},
              },
            },
          },
        },
        rooms: {
          type: 'integer',
          description: '酒店房间数',
          format: 'int32',
        },
        isDelete: {
          type: 'boolean',
        },
        roomTypes: {
          type: 'array',
          description: '酒店房型',
          items: {
            title: 'RoomTypeDO',
            description: '静态信息-酒店房型',
            type: 'object',
            properties: {
              hotelId: {
                type: 'string',
                description: '酒店ID',
              },
              roomTypeId: {
                type: 'string',
                description: '房型ID',
              },
              name: {
                type: 'string',
                description: '房型名称',
              },
              nameTranslated: {
                type: 'string',
                description: '房型名称翻译',
              },
              sizeOfRoom: {
                type: 'string',
                description: '如：16－30平米',
              },
              floor: {
                type: 'string',
                description: '如：7-8层',
              },
              bed: {
                type: 'array',
                description: '床型信息',
                items: {
                  title: 'FeedBedDO',
                  description: '床型信息',
                  type: 'object',
                  properties: {
                    bedWidth: {
                      type: 'string',
                      description: '床宽',
                    },
                    bedNum: {
                      type: 'integer',
                      description: '床数量',
                      format: 'int32',
                    },
                    bedType: {
                      type: 'string',
                      description: '床型',
                      enum: [
                        'QUEEN_BED',
                        'DOUBLE_BED',
                        'KING_BED',
                        'SEMI_DOUBLE',
                        'SINGLE_BED',
                        'ROUND_BED',
                        'SOFA_BED',
                        'TATAMI',
                        'SPACE_CAPSULE',
                        'CAPSULE_BED',
                        'WATER_BED',
                        'BUNK_BED',
                        'FLOOR_BED',
                        'UNKNOWN',
                      ],
                      'x-xapi-enumDescriptions': {
                        QUEEN_BED: '',
                        DOUBLE_BED: '',
                        KING_BED: '',
                        SEMI_DOUBLE: '',
                        SINGLE_BED: '',
                        ROUND_BED: '',
                        SOFA_BED: '',
                        TATAMI: '',
                        SPACE_CAPSULE: '',
                        CAPSULE_BED: '',
                        WATER_BED: '',
                        BUNK_BED: '',
                        FLOOR_BED: '',
                        UNKNOWN: '',
                      },
                    },
                    relation: {
                      type: 'string',
                      description: '床关系',
                      enum: ['AND', 'OR'],
                      'x-xapi-enumDescriptions': {
                        AND: '',
                        OR: '',
                      },
                    },
                  },
                },
              },
              maxOccupancy: {
                type: 'integer',
                description: '最大可入住人数',
                format: 'int32',
              },
              maxAdults: {
                type: 'integer',
                description: '最大可入住成人数',
                format: 'int32',
              },
              maxChildren: {
                type: 'integer',
                description: '最大可入住儿童人数',
                format: 'int32',
              },
              maxExtraBeds: {
                type: 'integer',
                description: '额外可加床数量',
                format: 'int32',
              },
              views: {
                type: 'string',
                description: '景观',
              },
              windowType: {
                type: 'boolean',
                description: '是否有窗',
              },
              pictures: {
                type: 'array',
                description: '房型图片',
                items: {
                  title: 'FeedPictureDO',
                  description: '静态信息-图片',
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'ID',
                    },
                    caption: {
                      type: 'string',
                      description: '标题',
                    },
                    captionTranslated: {
                      type: 'string',
                      description: '标题翻译',
                    },
                    url: {
                      type: 'string',
                      description: '图片URL',
                    },
                    isMainPic: {
                      type: 'boolean',
                      description: '是否为主图',
                    },
                  },
                },
              },
              facilities: {
                type: 'array',
                description: '房型设施',
                items: {
                  title: 'FeedFacilityDO',
                  description: '酒店设施',
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: '设施ID',
                    },
                    name: {
                      type: 'string',
                      description: '设施名称',
                    },
                    nameTranslated: {
                      type: 'string',
                      description: '设施名称翻译',
                    },
                    description: {
                      type: 'string',
                      description: '设施描述',
                    },
                  },
                },
              },
              requestPk: {
                type: 'string',
              },
              vendorCode: {
                type: 'string',
              },
              vendorType: {
                type: 'string',
              },
              data: {
                type: 'string',
                description: '原始数据',
              },
              time: {
                type: 'number',
                description: '数据时间',
              },
              language: {
                type: 'string',
                description: '语言',
              },
            },
            required: [
              'hotelId',
              'roomTypeId',
              'bed',
              'pictures',
              'facilities',
              'requestPk',
              'vendorCode',
            ],
          },
        },
        pictures: {
          type: 'array',
          description: '酒店图片',
          items: {
            title: 'FeedPictureDO',
            description: '静态信息-图片',
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'ID',
              },
              caption: {
                type: 'string',
                description: '标题',
              },
              captionTranslated: {
                type: 'string',
                description: '标题翻译',
              },
              url: {
                type: 'string',
                description: '图片URL',
              },
              isMainPic: {
                type: 'boolean',
                description: '是否为主图',
              },
            },
          },
        },
        facilities: {
          type: 'array',
          description: '酒店设施',
          items: {
            title: 'FeedFacilityDO',
            description: '酒店设施',
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: '设施ID',
              },
              name: {
                type: 'string',
                description: '设施名称',
              },
              nameTranslated: {
                type: 'string',
                description: '设施名称翻译',
              },
              description: {
                type: 'string',
                description: '设施描述',
              },
            },
          },
        },
      },
      required: [
        'hotelId',
        'country',
        'city',
        'tel',
        'childAndExtraBedPolicy',
        'addresses',
        'roomTypes',
        'pictures',
        'facilities',
      ],
    },
  },
  required: ['success', 'time', 'data'],
};

const vendor = {
  type: 'object',
  properties: {
    trackingId: {
      type: 'string',
      description: 'Requested trackingId',
      examples: ['7c3dc487b6ef4a2b'],
    },
    data: {
      type: 'array',
      description: 'Response data sequence',
      items: {
        type: 'object',
        properties: {
          propertyId: {
            type: 'string',
            description: 'The unique identifier for a property',
            maxLength: 100,
            examples: ['IDS_1'],
          },
          propertyData: {
            type: 'object',
            description: 'Detailed property info',
            properties: {
              type: {
                type: 'string',
                description: 'Property type',
                enum: ['HOTEL'],
                'x-xapi-enumDescriptions': { HOTEL: '' },
              },
              name: {
                type: 'object',
                description: 'Property name',
                properties: {
                  ko: { type: 'string' },
                  en: { type: 'string' },
                },
              },
              country: {
                type: 'string',
                description: 'Property ISO country code',
              },
              city: {
                type: 'object',
                description: 'City where property is located',
                properties: {
                  ko: { type: 'string' },
                  en: { type: 'string' },
                },
              },
              phone: {
                type: 'string',
                description: 'Property main phone number',
              },
              zipCode: {
                type: 'string',
                description: 'Property postal code',
              },
              address: {
                type: 'object',
                description: 'Property address',
                properties: {
                  ko: { type: 'string' },
                  en: { type: 'string' },
                },
              },
              regionSet: {
                type: 'object',
                description: 'Basic property setting',
                properties: {},
              },
              language: {
                type: 'array',
                description: 'Language ISO code',
                items: { type: 'string' },
              },
              timezone: {
                type: 'string',
                description: 'Property time zone',
              },
              currency: {
                type: 'string',
                description: 'Property basic ISO currency code',
              },
              coordinates: {
                type: 'object',
                description: 'Property latitude and longitude',
                properties: {
                  longitude: {
                    type: 'number',
                    description: 'Longitude (6 decimal places)',
                  },
                  latitude: {
                    type: 'number',
                    description: 'Latitude (6 decimal places)',
                  },
                },
              },
              isOpen: { type: 'boolean', description: 'Sell?' },
              numberOfRooms: {
                type: 'integer',
                description: 'Total rooms',
              },
              photos: {
                type: 'array',
                description: 'Property photos',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'Property photo ID',
                    },
                    url: {
                      type: 'string',
                      description: 'Photo URL',
                    },
                    isMain: {
                      type: 'boolean',
                      description: 'Main photo?',
                    },
                    category: {
                      type: 'string',
                      description: 'Photo category',
                    },
                  },
                  required: ['url', 'isMain', 'category'],
                },
              },
              starRatings: {
                type: 'array',
                description: 'Property star rating info',
                items: {
                  type: 'object',
                  properties: {
                    rating: {
                      type: 'number',
                      description: 'Star rating (1 decimal place)',
                    },
                    isOfficial: {
                      type: 'boolean',
                      description: 'Official star rating? (default: false)',
                    },
                    provider: {
                      type: 'string',
                      description: 'Organization deciding on star rating',
                    },
                    date: {
                      type: 'string',
                      description: 'Star rating decision date',
                      format: 'date',
                    },
                  },
                  required: ['rating', 'provider'],
                },
              },
              descriptions: {
                type: 'object',
                description: 'Detailed property description',
                properties: {},
              },
              overview: {
                type: 'object',
                description: 'Property overview',
                properties: {
                  ko: { type: 'string' },
                  en: { type: 'string' },
                },
              },
              welcomeMessage: {
                type: 'object',
                description: 'Property introduction message',
                properties: {
                  ko: { type: 'string' },
                  en: { type: 'string' },
                },
              },
              importantInformation: {
                type: 'object',
                description: 'Important announcements',
                properties: {
                  ko: { type: 'string' },
                  en: { type: 'string' },
                },
              },
              facilities: {
                type: 'array',
                description: 'Other facility info',
                items: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      description: 'Facility type',
                    },
                    name: {
                      type: 'object',
                      description: 'Facility name',
                      properties: {
                        ko: { type: 'string' },
                        en: { type: 'string' },
                      },
                    },
                    value: {
                      type: 'string',
                      description: 'Facility related value',
                    },
                    attrs: {
                      type: 'object',
                      description: 'Detailed facility description',
                      properties: {},
                      additionalProperties: true,
                    },
                  },
                },
              },
              checkinCheckoutTimes: {
                type: 'object',
                description: 'Check-in/out time',
                properties: {
                  checkinTo: {
                    type: 'string',
                    description: 'Check-in end time',
                  },
                  checkoutTo: {
                    type: 'string',
                    description: 'Check-out end time',
                  },
                  checkinFrom: {
                    type: 'string',
                    description: 'Check-in start time',
                  },
                  checkoutFrom: {
                    type: 'string',
                    description: 'Check-out start time',
                  },
                  checkin24hour: {
                    type: 'boolean',
                    description:
                      'Able to check-in for any of 24 hours in a day?',
                  },
                  checkout24hour: {
                    type: 'boolean',
                    description:
                      'Able to check-out for any of 24 hours in a day?',
                  },
                },
              },
            },
            required: [
              'type',
              'name',
              'city',
              'language',
              'timezone',
              'currency',
              'coordinates',
              'isOpen',
            ],
          },
          roomTypeData: {
            type: 'array',
            description: 'Detailed roomType info',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'Identifier for a roomtype',
                  maxLength: 100,
                  examples: ['R1234'],
                },
                name: {
                  type: 'object',
                  description: 'Room type name',
                  properties: {
                    ko: { type: 'string' },
                    en: { type: 'string' },
                  },
                },
                description: {
                  type: 'object',
                  description: 'Room type description',
                  properties: {
                    ko: { type: 'string' },
                    en: { type: 'string' },
                  },
                },
                isOpen: {
                  type: 'boolean',
                  description: 'Able to sell the room type?',
                },
                occupancy: {
                  type: 'object',
                  description: 'Room capacity info',
                  properties: {
                    total: {
                      type: 'integer',
                      description: 'Standard room capacity',
                    },
                    adult: {
                      type: 'integer',
                      description: 'Standard adult room capacity',
                    },
                    child: {
                      type: 'integer',
                      description: 'Standard child room capacity',
                    },
                    maxTotal: {
                      type: 'integer',
                      description: 'Max number of guests who can enter',
                    },
                    maxAdult: {
                      type: 'integer',
                      description: 'Max number of adult guests who can enter',
                    },
                    maxChild: {
                      type: 'integer',
                      description: 'Max number of child guests who can enter',
                    },
                  },
                },
                roomSize: {
                  type: 'number',
                  description: 'Room size (square meters / 2 decimal places)',
                },
                roomCount: {
                  type: 'object',
                  description: 'Detailed room quantity included in room type',
                  properties: {
                    bedroom: {
                      type: 'integer',
                      description: 'Number of beds in room',
                    },
                    bathroom: {
                      type: 'integer',
                      description: 'Number of bathrooms in room',
                    },
                    livingroom: {
                      type: 'integer',
                      description: 'Number of living rooms in room',
                    },
                  },
                },
                productData: {
                  type: 'array',
                  description: 'Detailed product info',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'The unique identifier for a product',
                        maxLength: 100,
                        examples: ['P1234'],
                      },
                      name: {
                        type: 'object',
                        description: 'Product name',
                        properties: {
                          ko: { type: 'string' },
                          en: { type: 'string' },
                        },
                      },
                      description: {
                        type: 'object',
                        description: 'Product Description',
                        properties: {
                          ko: { type: 'string' },
                          en: { type: 'string' },
                        },
                      },
                      isOpen: {
                        type: 'boolean',
                        description: 'Able to sell the product?',
                      },
                      checkinCheckoutTimes: {
                        type: 'object',
                        description: 'Check-in/out time',
                        properties: {
                          checkinTo: {
                            type: 'string',
                            description: 'Check-in end time',
                          },
                          checkoutTo: {
                            type: 'string',
                            description: 'Check-out end time',
                          },
                          checkinFrom: {
                            type: 'string',
                            description: 'Check-in start time',
                          },
                          checkoutFrom: {
                            type: 'string',
                            description: 'Check-out start time',
                          },
                          checkin24hour: {
                            type: 'boolean',
                            description:
                              'Able to check-in for any of 24 hours in a day?',
                          },
                          checkout24hour: {
                            type: 'boolean',
                            description:
                              'Able to check-out for any of 24 hours in a day?',
                          },
                        },
                      },
                      minLos: {
                        type: 'integer',
                        description: 'The minimum length of stay',
                      },
                      maxLos: {
                        type: 'integer',
                        description: 'The maximum length of stay',
                      },
                      benefits: {
                        type: 'array',
                        description: 'Benefit sequence',
                        items: {
                          type: 'object',
                          properties: {
                            benefitId: {
                              type: 'string',
                              description: 'Benefit ID',
                            },
                            name: {
                              type: 'object',
                              description: 'Benefit name',
                              properties: {
                                ko: { type: 'string' },
                                en: { type: 'string' },
                              },
                            },
                            attrs: {
                              type: 'object',
                              description: 'Benefit description',
                              properties: {},
                              additionalProperties: true,
                            },
                          },
                        },
                      },
                    },
                    required: ['id', 'name', 'isOpen'],
                  },
                },
                photos: {
                  type: 'array',
                  description: 'Room photo info',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'RoomType photo ID',
                      },
                      url: {
                        type: 'string',
                        description: 'Photo URL',
                      },
                      isMain: {
                        type: 'boolean',
                        description: 'Main photo?',
                      },
                      category: {
                        type: 'string',
                        description: 'Photo category',
                      },
                    },
                    required: ['url', 'isMain', 'category'],
                  },
                },
                facilities: {
                  type: 'array',
                  description: 'Facility info in room',
                  items: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        description: 'Facility type ID',
                      },
                      name: {
                        type: 'object',
                        description: 'Facility name',
                        properties: {
                          ko: { type: 'string' },
                          en: { type: 'string' },
                        },
                      },
                      value: {
                        type: 'string',
                        description: 'Facility related value',
                      },
                      attrs: {
                        type: 'object',
                        description: 'Detailed facility description',
                        properties: {},
                        additionalProperties: true,
                      },
                    },
                  },
                },
              },
              required: ['id', 'name', 'isOpen'],
            },
          },
          updatedAt: {
            type: 'string',
            description: 'Property last corrected date and time',
            format: 'date-time',
          },
          createdAt: {
            type: 'string',
            description: 'Property created date and time',
            format: 'date-time',
          },
        },
        required: [
          'propertyId',
          'propertyData',
          'roomTypeData',
          'updatedAt',
          'createdAt',
        ],
      },
    },
    errors: {
      type: 'array',
      description: 'Error list',
      items: {
        type: 'object',
        properties: {
          code: { type: 'integer', description: 'Error code' },
          message: {
            type: 'string',
            description: 'Detailed error message',
          },
        },
        required: ['code', 'message'],
      },
    },
  },
  required: ['trackingId', 'data', 'errors'],
};
@Controller('/mapping')
export class MappingController {
  @Inject()
  mappingService: MappingService;

  @Post('/standard-api/save')
  async saveStandardApi(@Body() body: ApiSchemaDTO) {
    return await this.mappingService.saveStandardApi(standard);
  }

  @Post('/mapping-api/save')
  async saveMappingApi(@Body() body: ApiSchemaDTO) {
    return await this.mappingService.saveMappingApi(vendor);
  }

  @Get('/mapping/result')
  async getBulkMappingResult() { 
    return await this.mappingService.bulkMapping();
  }
}
