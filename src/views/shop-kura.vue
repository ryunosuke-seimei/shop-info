<template>
    <v-container
        class="
          d-flex
          flex-column flex-md-row
          justify-center justify-md-space-around
          align-center align-md-start
          py-8
        "
      >
        <h1>aaaa</h1>
    </v-container>
</template>


<script>
import data from "../assets/kura-data.json";

export default {
  name: "shop-kura",
  data: () => ({
    ShopData: data,
    ShopDataList:[],
    rules_bord_three: [
      (value) => !!value || "＊入力必須",
      (value) => {
        2;
        const pattern = /^([1-9]\d*|0)$/;
        return pattern.test(value) || "数字でお願いします";
      },
    ],
  }),
  created: function () {
    let data = {};
    const Number = Object.keys(this.ShopData.img_links).length;
    for (let i = 0; i < Number; i++) {
      data = {
        id:i,
        img_link: this.ShopData.img_links[i],
        kcal: this.ShopData.kcal[i],
        name: this.ShopData.name[i],
        tag: this.ShopData.tag[i],
        price: this.ShopData.price[i],
      };
      this.ShopDataList.push(data);
    }
  },
  methods: {
  },
  computed: {
    value_kcal: function () {
      return this.Value_P * 4 + this.Value_F * 9 + this.Value_C * 4;
    },
  },
};
</script>


<style>
.weight_big {
  width: 4rem;
}
.weight_small {
  width: 2rem;
}
.weight_span {
  display: inline-flex;
  justify-content: center;
  height: 100%;
}
.dataTable td {
  white-space: nowrap;
}
</style>