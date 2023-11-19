import nJwt from 'njwt';
import dotenv from "dotenv";
import * as uuid from 'uuid';
import { s3Mapper } from './s3.mapper';
dotenv.config();

export interface PaginationResults {
    list:any,
    pagination: any;
}

export interface Query {
    search?:string;
    sort?:string;
    order?:string;
    page?:number;
    size?:number;
}

export interface Body {
    "pageIndex": number,
    "pageSize": number,
    "search": string
    "sort": {
        "order": string,
        "key": string
    },
}

/*
The Base Mapper. Functions which are in common with others mappers are placed here to avoid duplication of code
 */
export class BaseMapper {
    private _QUERY: string;
    private _PARAM_FRONTCLOUD = 'https://images.mamboleofc.ca'

    public async processArray(listing) {
        if (listing.length) {
            const listArray = [];
                
            for (let item of listing) {
                console.log(item.get)
                listArray.push(item.get());
            }
            console.log('the list')
            console.log(listArray);    
            return listArray;
        }

        return [];
    }

    public async processImageArray(listing) {
        if (listing.length) {
            const listArray = [];
                
            for (let item of listing) {
                const key = s3Mapper.resizeWithInS3(item.key, {
                    "resize": {
                        "width": 400,
                        "height": 400,
                        "fit": "inside"
                    }
                });


                item.key = `${this._PARAM_FRONTCLOUD}/${key}`;
               
                listArray.push(item);
            }
            console.log('the list')
            console.log(listArray);    
            return listArray;
        }

        return [];
    }



    /**
     * Preparing the paginated results
     * @param list
     * @param body
     */
    public prepareListResults(list, body: Body) {
        return this.generatePagination(list, body)
    }

    /**
     * Generation of pagination for various retrieval of lists
     * @param list: string[]
     * @param query: Query
     */
    public generatePagination(list:string[], body: Body) : PaginationResults {
        let listClone;
        listClone = list;
      
        const search = body.search || null;
        const sort = body.sort.order || this['DEFAULT_SORT']
        const order = body.sort.order || 'asc';
        const page = body.pageIndex || 1;
        const size = body.pageSize || 10;

        console.log('sdsdfsdf')
        console.log(sort);
        if (sort === 'identifier' || sort === body.sort)
        {
            listClone.sort((a, b) => {

                const fieldA = a[sort].toString().toUpperCase();
                const fieldB = b[sort].toString().toUpperCase();

                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        }
        else
        {
            listClone.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
        }

        // If search exists...
        if ( search )
        {
            // Filter the products
            listClone = listClone.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
        // Paginate - Start
        const listLength = listClone.length;
        // Calculate pagination details
        const begin = (page -1 ) * size;
        const end = Math.min((size * (page + 1)), listLength);
        const lastPage = Math.max(Math.ceil(listLength / size), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested page number is bigger than
        // the last possible page number, return null for
        // products but also send the last possible page so
        // the app can navigate to there
        if ( page > lastPage )
        {
            listClone = null;
            pagination = {
                lastPage
            };
        } else {
            // Paginate the results by size
            list = listClone.slice(begin, end);
            // Prepare the pagination mock-api
            pagination = {
                length    : listLength,
                size      : size,
                page      : page,
                lastPage  : lastPage,
                startIndex: begin,
                endIndex  : end - 1
            };
        }

        return JSON.parse(`{"data":${JSON.stringify(list)}, "pagination": ${JSON.stringify(pagination)}}`);
    }

    public generateJWTToken() {
        const token = nJwt.create({
            iss: "http://mamboleofc.ca/",  // The URL of your service
            sub: uuid.v4(),    // The UID of the user in your system
            scope: "self"
        },process.env.TOKEN_SECRET);

        token.setExpiration(new Date().getTime() + 60*1000)

        return token.compact();
    }

    public checkAuthenication(tokenHeader = undefined) {
        if (!tokenHeader) {
            return undefined
        }

        try {
            const token = tokenHeader.replace(/^Bearer\s/, '');

            const verified = nJwt.verify(token, process.env.TOKEN_SECRET);

            return (verified.body['exp'] < Date.now());
        } catch (error) {
            return error.toString();
        }
    }


    set QUERY(value: string) {
        this._QUERY = value;
    }
}
