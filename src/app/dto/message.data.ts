import { Injectable } from '@angular/core';

@Injectable()
export class MessageData {
  id: number;
  river_name: string;
  image_url: string;
  latitude: string;
  longitude: string;
  upload_from: string;
  comment: string;
  reliability: number;
  city_checked: string;
  prefecture_checked: string;
  ministry_checked: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    river_name: string,
    image_url: string,
    latitude: string,
    longitude: string,
    upload_from: string,
    comment: string,
    reliability: number,
    city_checked: string,
    prefecture_checked: string,
    ministry_checked: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.river_name = river_name;
    this.image_url = image_url;
    this.latitude = latitude;
    this.upload_from = upload_from;
    this.comment = comment;
    this.reliability = reliability;
    this.city_checked = city_checked;
    this.prefecture_checked = prefecture_checked;
    this.ministry_checked = ministry_checked;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
  
}