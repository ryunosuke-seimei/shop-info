<template>
  <v-app>
    <v-main>
      <v-container
        class="
          d-flex
          flex-column flex-md-row
          justify-center justify-md-space-around
          align-center align-md-start
          py-8
        "
      >
        <v-card
          class="flex-grow-0 flex-md-grow-1 mx-4"
          min-width="320"
          width="320"
          max-width="400"
        >
          <v-form ref="form1">
            <v-card-title> 詳細検索 </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    label="P"
                    v-model="Value_P"
                    maxlength="3"
                    pattern="\d*"
                    outlined
                    hide-details=""
                    :rules="rules_bord_three"
                    append-icon="mdi-alpha-g-box-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="F"
                    v-model="Value_F"
                    maxlength="3"
                    pattern="\d*"
                    outlined
                    hide-details=""
                    :rules="rules_bord_three"
                    append-icon="mdi-alpha-g-box-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="C"
                    v-model="Value_C"
                    maxlength="3"
                    pattern="\d*"
                    outlined
                    hide-details=""
                    :rules="rules_bord_three"
                    append-icon="mdi-alpha-g-box-outline"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="4">
                  <span>{{ value_kcal }} kcal </span>
                </v-col>
                <v-col cols="2">
                  <v-icon> mdi-fire </v-icon>
                </v-col>
              </v-row>
              <v-row justify="space-around">
                <v-checkbox
                  v-model="Value_yoshinoya"
                  label="吉野家"
                  hide-details=""
                ></v-checkbox>
                <v-checkbox
                  v-model="Value_matuya"
                  label="松屋"
                  hide-details=""
                ></v-checkbox>
              </v-row>
              <v-row justify="space-around">
                <v-checkbox
                  v-model="Value_yayoiken"
                  label="やよい軒"
                  hide-details=""
                ></v-checkbox>
                <v-checkbox
                  v-model="Value_ootoya"
                  label="大戸屋"
                  hide-details=""
                ></v-checkbox>
                <v-checkbox
                  v-model="Value_subway"
                  label="SubWay"
                  hide-details=""
                ></v-checkbox>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn class="flex-grow-1" @click="SearchMethod">
                検索
                <v-icon> mdi-grease-pencil </v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-sheet min-width="320" class="my-5 d-flex justify-center flex-wrap overflow-y-auto" max-height="800">
          <v-alert type="warning" v-show="!boolean_search">検索を行ってください。</v-alert>
          <template v-if="ShopDataSearch.length">
            <v-card
              v-for="item in ShopDataSearch"
              :key="item.id"
              width="300"
              class="ma-2"
            >
              <v-img height="200" :src="item.img_link" v-if="item.img_link"></v-img>
              <v-card-title>
                {{ item.name }}
              </v-card-title>
              <v-card-subtitle>
                {{ item.shop }}
              </v-card-subtitle>
              <v-card-text>
                <v-row justify="space-around">
                  <div>
                    <v-icon> mdi-alpha-p-box-outline </v-icon>
                    {{ item.P }}
                  </div>
                  <div>
                    <v-icon> mdi-alpha-f-box-outline </v-icon>
                    {{ item.F }}
                  </div>
                  <div>
                    <v-icon> mdi-alpha-c-box-outline </v-icon>
                    {{ item.C }}
                  </div>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn outlined :href="item.link">SITE</v-btn>
              </v-card-actions>
            </v-card>
          </template>
          <v-alert v-else-if="boolean_search" type="error">検索条件を見直してください</v-alert>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import data from "./assets/data.json";

export default {
  name: "App",
  data: () => ({
    ShopData: data,
    ShopDataList_yoshinoya: [],
    ShopDataList_matuya: [],
    ShopDataList_ootoya: [],
    ShopDataList_yayoiken: [],
    ShopDataList_subway: [],
    boolean_yoshinoya: true,
    boolean_matuya: true,
    boolean_ootoya: true,
    boolean_yayoiken: true,
    boolean_subway: true,
    boolean_search: false,
    Value_P: 0,
    Value_F: 0,
    Value_C: 0,
    Value_ootoya: true,
    Value_matuya: true,
    Value_yoshinoya: true,
    Value_subway: true,
    Value_yayoiken: true,
    ShopDataSearch: [],
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
    const Number = Object.keys(this.ShopData.img_link).length;
    for (let i = 0; i < Number; i++) {
      data = {
        img_link: this.ShopData.img_link[i],
        link: this.ShopData.link[i],
        kcal: this.ShopData.kcal[i],
        name: this.ShopData.name[i],
        P: this.ShopData.タンパク質[i],
        F: this.ShopData.脂質[i],
        C: this.ShopData.炭水化物[i],
        shop: this.ShopData.shop[i],
      };
      switch (data.shop) {
        case "やよい軒":
          this.ShopDataList_yayoiken.push(data);
          break;
        case "吉野家":
          this.ShopDataList_yoshinoya.push(data);
          break;
        case "SubWay":
          this.ShopDataList_subway.push(data);
          break;
        case "大戸屋":
          this.ShopDataList_ootoya.push(data);
          break;
        case "松屋":
          this.ShopDataList_matuya.push(data);
          break;
      }
    }
  },
  methods: {
    SearchMethod: function () {
      this.boolean_search = true;
      let list = [];
      let data = {};
      this.ShopDataSearch = {};
      const Number = Object.keys(this.ShopData.img_link).length;
      for (let i = 0; i < Number; i++) {
        data = {
          id: i,
          img_link: this.ShopData.img_link[i],
          link: this.ShopData.link[i],
          kcal: this.ShopData.kcal[i],
          name: this.ShopData.name[i],
          P: parseInt(this.ShopData.タンパク質[i]),
          F: parseInt(this.ShopData.脂質[i]),
          C: parseInt(this.ShopData.炭水化物[i]),
          shop: this.ShopData.shop[i],
        };
        if (
          data.P < this.Value_P &&
          data.F < this.Value_F &&
          data.C < this.Value_C
        ) {
          switch (data.shop) {
            case "やよい軒":
              if (this.Value_yayoiken) {
                list.push(data);
              }
              break;
            case "吉野家":
              if (this.Value_yoshinoya) {
                list.push(data);
              }
              break;
            case "SubWay":
              if (this.Value_subway) {
                list.push(data);
              }
              break;
            case "大戸屋":
              if (this.Value_ootoya) {
                list.push(data);
              }
              break;
            case "松屋":
              if (this.Value_matuya) {
                list.push(data);
              }
              break;
          }
        }
        this.ShopDataSearch = list;
      }
    },
  },
  computed: {
    ShopDataListShow: function () {
      let tmp = [];
      if (this.boolean_subway) {
        tmp = tmp.concat(this.ShopDataList_subway);
      }
      if (this.boolean_yoshinoya) {
        tmp = tmp.concat(this.ShopDataList_yoshinoya);
      }
      if (this.boolean_matuya) {
        tmp = tmp.concat(this.ShopDataList_matuya);
      }
      if (this.boolean_subway) {
        tmp = tmp.concat(this.ShopDataList_subway);
      }
      if (this.boolean_ootoya) {
        tmp = tmp.concat(this.ShopDataList_ootoya);
      }
      return tmp;
    },
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