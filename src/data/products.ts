// src/data/product.ts
import raumuong from '../assets/imageProduct/raumuong.jpg'
import caiboxoi from '../assets/imageProduct/caiboxoi.jpg'
import carot from '../assets/imageProduct/carot.jpg'
import khoaitay from '../assets/imageProduct/khoaitay.jpg'
import cachua from '../assets/imageProduct/cachua.jpg'
import dualeo from '../assets/imageProduct/dualeo.jpg'
import bapcai from '../assets/imageProduct/bapcai.jpg'
import bido from '../assets/imageProduct/bido.jpg'
import cucaitrang from '../assets/imageProduct/cucaitrang.jpg'
import raucaixanh from '../assets/imageProduct/raucaixanh.jpg'
import otchuong from '../assets/imageProduct/otchuong.jpg'
import hanhla from '../assets/imageProduct/hanhla.jpg'
import suhao from '../assets/imageProduct/suhao.jpg'
import bixanh from '../assets/imageProduct/bixanh.jpg'
import rauthomhonhop from '../assets/imageProduct/rauthomhonhop.jpg'
import khoailang from '../assets/imageProduct/khoailang.jpg'
import catim from '../assets/imageProduct/catim.jpg'
import daubap from '../assets/imageProduct/daubap.jpg'
import muophuong from '../assets/imageProduct/muophuong.jpg'
import bongcaixanh from '../assets/imageProduct/bongcaixanh.jpg'

export interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  description?: string
}

export const productsData: Product[] = [
  { id: 1, name: 'Rau muống', category: 'rau', price: 12000, image: raumuong },
  { id: 2, name: 'Cải bó xôi', category: 'rau', price: 18000, image: caiboxoi },
  { id: 3, name: 'Cà rốt', category: 'củ', price: 15000, image: carot },
  { id: 4, name: 'Khoai tây', category: 'củ', price: 20000, image: khoaitay },
  { id: 5, name: 'Cà chua', category: 'quả', price: 17000, image: cachua },
  { id: 6, name: 'Dưa leo', category: 'quả', price: 16000, image: dualeo },
  { id: 7, name: 'Bắp cải', category: 'rau', price: 22000, image: bapcai },
  { id: 8, name: 'Bí đỏ', category: 'củ', price: 25000, image: bido },
  { id: 9, name: 'Củ cải trắng', category: 'củ', price: 14000, image: cucaitrang },
  { id: 10, name: 'Rau cải xanh', category: 'rau', price: 19000, image: raucaixanh },
  { id: 11, name: 'Ớt chuông', category: 'quả', price: 28000, image: otchuong },
  { id: 12, name: 'Hành lá', category: 'rau', price: 10000, image: hanhla },
  { id: 13, name: 'Su hào', category: 'củ', price: 18000, image: suhao },
  { id: 14, name: 'Bí xanh', category: 'củ', price: 21000, image: bixanh },
  { id: 15, name: 'Rau thơm hỗn hợp', category: 'rau', price: 12000, image: rauthomhonhop },
  { id: 16, name: 'Khoai lang', category: 'củ', price: 18000, image: khoailang },
  { id: 17, name: 'Cà tím', category: 'quả', price: 16000, image: catim },
  { id: 18, name: 'Đậu bắp', category: 'quả', price: 15000, image: daubap },
  { id: 19, name: 'Mướp hương', category: 'quả', price: 17000, image: muophuong },
  { id: 20, name: 'Bông cải xanh', category: 'rau', price: 26000, image: bongcaixanh },
]
