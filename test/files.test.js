/* eslint-disable */
require(`should`);
const assert = require(`assert`);

const getExtension = require(`./getExtension`);

const mergePrefix = require(`./mergePrefix`);

describe(`正则表达式获取文件拓展名测试`, () => {
  describe(`javascript文件`, () => {
    it(`it should return "js"`, () => {
      getExtension(`index.js`).should.equal(`js`);
      getExtension(`precache-manifest.406sjkdjflkdjsfl.js`).should.equal(`js`);
      getExtension(`ee_ss.eee.js`).should.equal(`js`);
    });
  });
  describe(`css文件`, () => {
    it(`it should return "css"`, () => {
      getExtension(`index.css`).should.equal(`css`);
      getExtension(`precache-manifest.406sjkdjflkdjsfl.css`).should.equal(
        `css`
      );
      getExtension(`ee_ss.eee.css`).should.equal(`css`);
    });
  });
  describe(`html文件`, () => {
    it(`it should return "html"`, () => {
      getExtension(`index.html`).should.equal(`html`);
      getExtension(`precache-manifest.406sjkdjflkdjsfl.html`).should.equal(
        `html`
      );
      getExtension(`ee_ss.eee.html`).should.equal(`html`);
    });
  });
  describe(`image`, () => {
    it(`it should return "jpg"`, () => {
      getExtension(`index.jpg`).should.equal(`jpg`);
      getExtension(`precache-manifest.406sjkdjflkdjsfl.jpg`).should.equal(
        `jpg`
      );
      getExtension(`ee_ss.eee.jpg`).should.equal(`jpg`);
    });
    it(`it should return "png"`, () => {
      getExtension(`index.png`).should.equal(`png`);
      getExtension(`precache-manifest.406sjkdjflkdjsfl.png`).should.equal(
        `png`
      );
      getExtension(`ee_ss.eee.png`).should.equal(`png`);
    });
    it(`it should return "gif"`, () => {
      getExtension(`index.gif`).should.equal(`gif`);
      getExtension(`precache-manifest.406sjkdjflkdjsfl.gif`).should.equal(
        `gif`
      );
      getExtension(`ee_ss.eee.gif`).should.equal(`gif`);
    });
    it(`it should return "svg"`, () => {
      getExtension(`index.svg`).should.equal(`svg`);
      getExtension(`precache-manifest.406sjkdjflkdjsfl.svg`).should.equal(
        `svg`
      );
      getExtension(`ee_ss.eee.svg`).should.equal(`svg`);
    });
  });
});
// 更改路径，保持前缀
describe(`融合新增前缀文件名测试`, () => {
  describe(`文件路径融合"/"前缀`, () => {
    it(`it should return /xx`, () => {
      mergePrefix(`index`, `/`).should.equal(`/index`);
      mergePrefix(`index/sss`, `/`).should.equal(`/index/sss`);
      mergePrefix(`/ee_ss.eee`, `/`).should.equal(`/ee_ss.eee`);
      mergePrefix(`./precache-manifest.406sjkdjflkdjsfl`, `/`).should.equal(
        `/precache-manifest.406sjkdjflkdjsfl`
      );
      mergePrefix(
        `xxx/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`,
        `/`
      ).should.equal(
        `/xxx/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`
      );
    });
  });
  describe(`文件路径融合"./"前缀`, () => {
    it(`it should return ./xx`, () => {
      mergePrefix(`index`, `./`).should.equal(`./index`);
      mergePrefix(`index/sss`, `./`).should.equal(`./index/sss`);
      mergePrefix(`/ee_ss.eee`, `./`).should.equal(`./ee_ss.eee`);
      mergePrefix(`./precache-manifest.406sjkdjflkdjsfl`, `./`).should.equal(
        `./precache-manifest.406sjkdjflkdjsfl`
      );
      mergePrefix(
        `xxx/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`,
        `./`
      ).should.equal(
        `./xxx/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`
      );
    });
  });
  describe(`文件路径融合"./yy"前缀`, () => {
    it(`it should return ./yy/xx`, () => {
      mergePrefix(`index`, `./index`).should.equal(`./index/index`);
      mergePrefix(`index/sss`, `./index`).should.equal(`./index/index/sss`);
      mergePrefix(`/ee_ss.eee`, `./ee_ss.eee`).should.equal(
        `./ee_ss.eee/ee_ss.eee`
      );
      mergePrefix(
        `./precache-manifest.406sjkdjflkdjsfl`,
        `./precache-manifest.406sjkdjflkdjsfl`
      ).should.equal(
        `./precache-manifest.406sjkdjflkdjsfl/precache-manifest.406sjkdjflkdjsfl`
      );
      mergePrefix(
        `xxx/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`,
        `./index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`
      ).should.equal(
        `./index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl/xxx/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`
      );
    });
  });

  describe(`文件路径融合"yy"前缀`, () => {
    it(`it should return yy/xx`, () => {
      mergePrefix(`index`, `index`).should.equal(`index/index`);
      mergePrefix(`/ee_ss.eee`, `ee_ss.eee`).should.equal(
        `ee_ss.eee/ee_ss.eee`
      );
      mergePrefix(
        `./precache-manifest.406sjkdjflkdjsfl`,
        `precache-manifest.406sjkdjflkdjsfl`
      ).should.equal(
        `precache-manifest.406sjkdjflkdjsfl/precache-manifest.406sjkdjflkdjsfl`
      );
      mergePrefix(
        `xxx/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`,
        `index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`
      ).should.equal(
        `index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl/xxx/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`
      );
    });
  });
  describe(`文件路径融合"yy/"前缀`, () => {
    it(`it should return yy/xx`, () => {
      mergePrefix(`index`, `index/`).should.equal(`index/index`);
      mergePrefix(`/ee_ss.eee`, `ee_ss.eee/`).should.equal(
        `ee_ss.eee/ee_ss.eee`
      );
      mergePrefix(
        `./precache-manifest.406sjkdjflkdjsfl`,
        `precache-manifest.406sjkdjflkdjsfl/`
      ).should.equal(
        `precache-manifest.406sjkdjflkdjsfl/precache-manifest.406sjkdjflkdjsfl`
      );
      mergePrefix(
        `xxx/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`,
        `index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl/`
      ).should.equal(
        `index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl/xxx/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`
      );
    });
  });
  describe(`文件路径融合"yy/zz"前缀`, () => {
    it(`it should return yy/zz/xx`, () => {
      mergePrefix(`index`, `index/t`).should.equal(`index/t/index`);
      mergePrefix(`ee_ss.eee`, `ee_ss.eee/t`).should.equal(
        `ee_ss.eee/t/ee_ss.eee`
      );
      mergePrefix(
        `./precache-manifest.406sjkdjflkdjsfl`,
        `./precache-manifest.406sjkdjflkdjsfl/t`
      ).should.equal(
        `./precache-manifest.406sjkdjflkdjsfl/t/precache-manifest.406sjkdjflkdjsfl`
      );
      mergePrefix(
        `xxx/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`,
        `./index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl/t`
      ).should.equal(
        `./index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl/t/xxx/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl`
      );
    });
  });
  // describe('文件路径融合"//"前缀',function(){
  //     it("it should return /xx",function(){
  //         mergePrefix('index','//').should.equal('/index');
  //         mergePrefix('index/sss','//').should.equal('/sss/index');
  //         mergePrefix('/ee_ss.eee','//').should.equal('/ee_ss.eee');
  //         mergePrefix('./precache-manifest.406sjkdjflkdjsfl/','//').should.equal('/precache-manifest.406sjkdjflkdjsfl');
  //         mergePrefix('./index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl/','//').should.equal('/index++=ee_ss.eee22/precache-manifest.406sjkdjflkdjsfl');
  //     });
  // });
});
