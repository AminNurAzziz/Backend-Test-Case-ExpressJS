# Backend Test Case
## My Tech Stack

- NodeJS
- ExpressJS
- MongoDB (NoSQL)
- Swagger as API Documentation

## Swagger UI

Swagger UI is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Entities

- Member
- Book

## Use Case

- Members can borrow books with conditions
    - :heavy_check_mark:  Members may not borrow more than 2 books
    - :heavy_check_mark:  Borrowed books are not borrowed by other members
    - :heavy_check_mark:  Member is currently not being penalized
- Member returns the book with conditions
    - :heavy_check_mark:  The returned book is a book that the member has borrowed
    - :heavy_check_mark:  If the book is returned after more than 7 days, the member will be subject to a penalty. Member with penalty cannot able to borrow the book for 3 days
- Check the book
    - :heavy_check_mark:  Shows all existing books and quantities
    - :heavy_check_mark:  Books that are being borrowed are not counted
- Member check
    - :heavy_check_mark:  Shows all existing members
    - :heavy_check_mark:  The number of books being borrowed by each member

## Requirements

- :heavy_check_mark:  it should be use any framework, but prefered [NestJS](https://nestjs.com/) Framework Or [ExpressJS](https://expressjs.com/)
- :heavy_check_mark:  it should be use Swagger as API Documentation
- :heavy_check_mark:  it should be use Database (SQL/NoSQL)
- :heavy_check_mark:  it should be open sourced on your github repo

## Extras

- :heavy_check_mark:  Implement [DDD Pattern]([https://khalilstemmler.com/articles/categories/domain-driven-design/](https://khalilstemmler.com/articles/categories/domain-driven-design/))
- :heavy_check_mark:  Implement Unit Testing

## Notes
- Feel free to add some structure or plugins


------

# ALGORITMA
Kerjakan dengan menggunakan bahasa pemograman yg anda kuasai, buat folder terpisah untuk soal ini

1. :heavy_check_mark: Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

2. :heavy_check_mark: Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu

Contoh:  
```
const sentence = "Saya sangat senang mengerjakan soal algoritma"

longest(sentence) 
// mengerjakan: 11 character
```
3. :heavy_check_mark: Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT

Contoh:  
```
INPUT = ['xc', 'dz', 'bbb', 'dz']  
QUERY = ['bbb', 'ac', 'dz']  

OUTPUT = [1, 0, 2] karena kata 'bbb' terdapat 1 pada INPUT, kata 'ac' tidak ada pada INPUT, dan kata 'dz' terdapat 2 pada INPUT
```

4. :heavy_check_mark: Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:

Contoh:
```
Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

diagonal pertama = 1 + 5 + 9 = 15 
diagonal kedua = 0 + 5 + 7 = 12 

maka hasilnya adalah 15 - 12 = 3
```

