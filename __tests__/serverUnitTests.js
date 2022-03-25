import regeneratorRuntime from "regenerator-runtime";
import server from '../dist/server.js';
import request from 'supertest';
import fs from 'fs';
import path from 'path';

// const regeneratorRuntime = require('regenerator-runtime');
// const request = require('supertest');
// const fs = require('fs');
// const path = require('path');


describe('Route integration', () => {
  afterAll(() => {
    console.log('I ran');
  });

  describe('/', () => {
    describe('GET', () => {
      it('responds with 400 status and text/html content type', async () => {
        return await request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(400);
      });
    });
  });

  // describe('/connectcluster', () => {
  //   describe('GET', () => {
  //     it('responds with 200 status and text/html content type', async () => {
  //       return await request(server)
  //         .get('/')
  //         .expect('Content-Type', /text\/html/)
  //         .expect(200);
  //     });
  //   });
  // });
});
